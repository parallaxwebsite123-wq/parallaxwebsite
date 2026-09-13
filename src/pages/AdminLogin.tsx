import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // TEMPORARY — BACKEND NOT IMPLEMENTED
    navigate('/admin');
    setIsLoading(false);
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

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-error/10 text-error font-body-md text-sm rounded-lg border border-error/20 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Login ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/40 border border-white/50 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-body-md placeholder:text-on-surface-variant/50"
              required
            />
          </div>

          <div>
            <label className="block font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/40 border border-white/50 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-body-md placeholder:text-on-surface-variant/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-label-sm text-label-sm uppercase tracking-widest py-4 px-8 rounded-xl shadow-md hover:bg-primary/90 transition-all duration-300 active:scale-95 disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
