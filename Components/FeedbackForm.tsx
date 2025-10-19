import React from 'react';
import { SubmissionStatus } from '../types';
import StarIcon from './icons/StarIcon';

interface FeedbackFormProps {
  rating: number;
  name: string;
  feedback: string;
  status: SubmissionStatus;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFeedbackChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ rating, name, feedback, status, onNameChange, onFeedbackChange, onSubmit }) => {
  const isSubmitting = status === 'submitting';
  const isFormIncomplete = name.trim().length === 0 || feedback.trim().length === 0;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
        ))}
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Share Your Feedback</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Let us know about your experience.</p>

      <div className="w-full space-y-4">
        <input
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Your Name"
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          disabled={isSubmitting}
          aria-label="Your Name"
        />
        <textarea
          value={feedback}
          onChange={onFeedbackChange}
          placeholder="Share your experience..."
          className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          disabled={isSubmitting}
          aria-label="Your Review"
        />
      </div>
      
      {status === 'error' && (
        <p className="text-red-500 mt-2 text-sm">Something went wrong. Please try again.</p>
      )}

      <button
        onClick={onSubmit}
        disabled={isSubmitting || isFormIncomplete}
        className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : 'Submit Feedback'}
      </button>
    </div>
  );
};

export default FeedbackForm;