import React, { useState } from 'react';

interface AdminSignUpProps {
  onSignUp: (email: string, pass: string) => void;
  onNavigateHome: () => void;
  onSwitchToLogin: () => void;
}

const AdminSignUp: React.FC<AdminSignUpProps> = ({ onSignUp, onNavigateHome, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    onSignUp(email, password);
  };

  return (
     <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">Create Admin Account</h2>
        <button onClick={onNavigateHome} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Back to Site
        </button>
       </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email-signup" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <input
            id="email-signup"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            placeholder="new.admin@example.com"
          />
        </div>

        <div>
           <label htmlFor="password-signup" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            id="password-signup"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition-colors"
          >
            Create Account
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default AdminSignUp;
