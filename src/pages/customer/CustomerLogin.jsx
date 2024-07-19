import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/auth';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password, 'customer');
    if (res.success) {
      navigate('/customer/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-background">
      {/* Back Button */}
      <div 
        onClick={() => navigate("/portal")} 
        className="absolute top-6 left-8 flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 cursor-pointer z-50"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        <span className="font-body-md text-body-md font-semibold">Back to Portal</span>
      </div>

      {/* Left Column: Form Section */}
      <section className="w-full md:w-1/2 h-full relative flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 bg-surface-container-lowest overflow-hidden">
        <div className="max-w-[420px] w-full flex flex-col justify-center py-8">
          {/* Brand Identity */}
          <div className="flex flex-col items-center mb-6 cursor-pointer" onClick={() => navigate("/")}>
            <img 
              alt="NexaCart Logo" 
              className="w-14 h-14 mb-2 object-contain grayscale transition-all duration-500 hover:grayscale-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8dAT5fHoDW18KO9oCfGsCkHYCRAnYArAujSSIT3N_J8M_R5n31R19xGFGdfh5QjnEeXHqG6ldRM2sOFS6KbMxDhVjNaDmeLKvSpyL2LeahDO8Z_7q_9z_mh5BY-xa57CCvbE28UeWy5t_ZVvXmPt4aN9nA6giMs11NIdCXipsc3PewXh-_UHZumzHZpd_OCRFmSKzimWVKkb5EWwmxflp0RyMvPwJMUUw687mxmN6Q-ztSnHo2eOvySM_fkYKSlrCJJRJ4NzYUF0" 
            />
            <h1 className="font-headline-md text-xl font-bold text-primary tracking-tight">
              NexaCart
            </h1>
          </div>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="font-display-lg text-2xl font-bold text-on-surface mb-2 leading-tight">
              Customer Sign In
            </h2>
            <p className="font-body-md text-sm text-secondary">
              Sign in to manage your orders and profile.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs font-semibold rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form 
            className="w-full space-y-4" 
            onSubmit={handleSubmit}
          >
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block" htmlFor="email">Email Address</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all font-body-md" 
              id="email" 
              placeholder="name@company.com" 
              required 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block" htmlFor="password">Password</label>
              <span className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer">Forgot?</span>
            </div>
            <div className="relative">
              <input 
                className="w-full pr-12 pl-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all font-body-md" 
                id="password" 
                placeholder="••••••••" 
                required 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined select-none text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

            <button 
              className="w-full py-3.5 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white font-semibold rounded-full border-t border-white/10 hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/5 mt-6 cursor-pointer" 
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink mx-4 font-label-sm text-label-sm text-surface-tint">OR</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Social login */}
          <button className="w-full flex items-center justify-center gap-3 py-3 border border-outline-variant bg-surface-container-lowest rounded-lg hover:bg-surface-container transition-colors duration-200 group cursor-pointer" type="button">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="font-body-md text-primary font-medium">Continue with Google</span>
          </button>

          {/* Auth Navigation Link */}
          <p className="mt-6 text-center font-body-md text-secondary">Don't have an account? <span onClick={() => navigate("/customer/signup")} className="text-primary font-semibold hover:underline cursor-pointer">Sign up here</span></p>
        </div>
      </section>

      {/* Right Column: Visual Hero Section */}
      <section className="hidden md:block w-1/2 h-full relative overflow-hidden bg-primary-container">
        <video 
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
          src="/src/user.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-primary-container/20 to-transparent pointer-events-none" />
        
        {/* Branding Accent Box */}
        <div className="absolute bottom-12 left-12 right-12 glass-effect p-8 rounded-xl z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">Premium Experience</span>
          </div>
          <h3 className="font-headline-md text-xl font-bold text-primary mb-2">
            Premium Retail Discoveries
          </h3>
          <p className="font-body-md text-sm text-secondary">
            Explore curated lifestyle selections, verified product authenticity, and fast global settlement for high-end commerce.
          </p>
        </div>
      </section>
    </main>
  );
}
