export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export type FeedbackEntry = {
  rating: number;
  name: string;
  feedback: string;
  date: string;
};

export type User = {
  email: string;
  password: string;
};