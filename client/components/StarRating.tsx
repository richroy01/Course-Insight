import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  label?: string;
}

export function StarRating({ 
  value, 
  onChange, 
  max = 5, 
  size = 'md', 
  disabled = false,
  label 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const handleClick = (rating: number) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const getStarState = (index: number) => {
    const starValue = index + 1;
    const activeRating = hoverRating || value;
    
    if (starValue <= activeRating) {
      return 'active';
    }
    return 'inactive';
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-1">
        {Array.from({ length: max }, (_, index) => {
          const starState = getStarState(index);
          const starValue = index + 1;
          
          return (
            <button
              key={index}
              type="button"
              disabled={disabled}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                'transition-all duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-course-primary focus:ring-offset-2 rounded',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              )}
              aria-label={`Rate ${starValue} out of ${max} stars`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  'transition-colors duration-150',
                  starState === 'active' 
                    ? 'text-course-accent fill-current' 
                    : 'text-slate-300 hover:text-course-accent/50'
                )}
              />
            </button>
          );
        })}
        {value > 0 && (
          <span className="ml-2 text-sm text-slate-600">
            {value} out of {max}
          </span>
        )}
      </div>
    </div>
  );
}
