import React from 'react';

/**
 * Accessible Loading Spinner Component
 */
export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3" role="status" aria-live="polite">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-primary/20 border-t-primary rounded-full animate-spin`}
      />
      {text && <span className="text-sm font-medium text-slate-500">{text}</span>}
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
