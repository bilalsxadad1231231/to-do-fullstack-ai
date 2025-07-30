import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

const LoadingSpinner = ({ 
  size = 'md', 
  className = '', 
  text = 'Loading...',
  showText = true 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className={clsx(sizes[size], 'animate-spin text-primary-600')} />
        {showText && (
          <p className="text-sm text-gray-600">{text}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 