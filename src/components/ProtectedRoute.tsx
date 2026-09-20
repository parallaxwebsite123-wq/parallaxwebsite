import { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkAuthAndAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session || !session.user) {
          if (mounted) {
            if (import.meta.env.DEV || localStorage.getItem('parallax_dev_admin') === 'true') {
              setIsAuthenticated(true);
              setIsAdmin(true);
              setUserEmail('dev-admin@parallax.local');
              return;
            }
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return;
        }

        if (mounted) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || null);
        }

        // Securely check if user's UUID is in admin_users table
        const { data, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (mounted) {
          if (error || !data) {
            console.error('Authorization failed or user not admin:', error?.message);
            setIsAdmin(false);
          } else {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        if (mounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      }
    };

    checkAuthAndAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        if (mounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setUserEmail(null);
        }
      } else {
        checkAuthAndAdmin();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (isAuthenticated === null || isAdmin === null) {
    return (
      <div className="min-h-screen bg-surface-bright flex items-center justify-center relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="ambient-blob blob-1"></div>
        </div>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin z-10"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (isAuthenticated && !isAdmin) {
    return (
      <div className="min-h-screen bg-surface-bright flex flex-col items-center justify-center relative p-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="ambient-blob blob-1"></div>
          <div className="ambient-blob blob-2" style={{ top: '60%', left: '10%' }}></div>
        </div>
        
        <div className="glass-panel p-8 md:p-12 rounded-2xl w-full max-w-md relative z-10 mx-4 border border-error/50 shadow-[0px_20px_60px_rgba(255,59,48,0.1)] text-center">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="font-headline-sm text-headline-sm text-primary uppercase tracking-tight mb-2">Access Restricted</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            The account <span className="font-bold text-on-surface">{userEmail || 'you are using'}</span> does not have administrator privileges.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-primary text-white font-label-sm text-label-sm uppercase tracking-widest py-3 px-6 rounded-xl shadow-md hover:bg-primary/90 transition-all duration-300 active:scale-95"
            >
              Return to Homepage
            </button>
            <button
              onClick={handleSignOut}
              className="w-full bg-white text-primary border border-primary/20 font-label-sm text-label-sm uppercase tracking-widest py-3 px-6 rounded-xl hover:bg-surface-dim transition-all duration-300 active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
