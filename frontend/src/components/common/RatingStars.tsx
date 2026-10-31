import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  totalReviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  totalReviews,
  size = 'md',
  showCount = true
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs font-semibold text-slate-600">
          {rating.toFixed(1)} {totalReviews !== undefined && `(${totalReviews})`}
        </span>
      )}
    </div>
  );
};

