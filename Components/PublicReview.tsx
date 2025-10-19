import React from 'react';
import StarIcon from './icons/StarIcon';

interface PublicReviewProps {
  rating: number;
}

const PublicReview: React.FC<PublicReviewProps> = ({ rating }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex mb-4 self-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`} />
        ))}
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Thank you for your feedback!</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Public reviews help others find us. Would you be willing to share your experience?</p>

      <a
        href="https://reviewthis.biz/LotusCare"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 text-center"
      >
        Leave a Public Review
      </a>
    </div>
  );
};

export default PublicReview;