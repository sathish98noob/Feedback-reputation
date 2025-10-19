import React from 'react';

interface SubmissionSuccessProps {
  title?: string;
  description?: string;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ 
  title = "Feedback Submitted", 
  description = "Thank you for your valuable feedback. We will use it to improve our service.",
}) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">{title}</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        {description}
      </p>
    </div>
  );
};

export default SubmissionSuccess;