
import React, { useState } from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  onRatingSelect: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingSelect }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="flex justify-center space-x-2">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => onRatingSelect(ratingValue)}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none transition-transform duration-150 ease-in-out hover:scale-125"
            aria-label={`Rate ${ratingValue} out of 5 stars`}
          >
            <StarIcon
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${
                ratingValue <= hoverRating
                  ? 'text-yellow-400'
                  : 'text-slate-300 dark:text-slate-600'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
