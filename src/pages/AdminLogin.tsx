import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to authenticate with Google.');
      setIsLoading(false);
    }
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex items-center justify-center">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2" style={{ top: '60%', left: '10%' }}></div>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-2xl w-full max-w-md relative z-10 mx-4 border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
        <div className="text-center mb-8">
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight mb-2 uppercase">Parallax Perfumery</h1>
          <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Administration</p>
        </div>

        <div className="space-y-6">
          {error && (
            <div className="p-3 bg-error/10 text-error font-body-md text-sm rounded-lg border border-error/20 text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white text-primary border border-primary/20 font-label-sm text-label-sm uppercase tracking-widest py-4 px-8 rounded-xl shadow-md hover:bg-surface-dim transition-all duration-300 active:scale-95 disabled:opacity-70 flex justify-center items-center gap-3"
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
