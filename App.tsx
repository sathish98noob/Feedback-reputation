import React, { useState, useCallback, useEffect } from 'react';
import StarRating from './components/StarRating';
import FeedbackForm from './components/FeedbackForm';
import { SubmissionStatus, FeedbackEntry, User } from './types';
import SubmissionSuccess from './components/SubmissionSuccess';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminSignUp from './components/admin/AdminSignUp';

type View = 'rating' | 'form' | 'success';

const App: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [view, setView] = useState<View>('rating');
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [successContent, setSuccessContent] = useState({
    title: 'Feedback Submitted',
    description: 'Thank you for your valuable feedback. We will use it to improve our service.',
  });

  const [allFeedback, setAllFeedback] = useState<FeedbackEntry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'feedback' | 'admin'>('feedback');
  const [adminView, setAdminView] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    try {
      const storedFeedback = localStorage.getItem('feedbackSubmissions');
      if (storedFeedback) {
        setAllFeedback(JSON.parse(storedFeedback));
      }
      const storedUsers = localStorage.getItem('appUsers');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        const defaultUser = { email: 'admin@example.com', password: 'password123' };
        setUsers([defaultUser]);
        localStorage.setItem('appUsers', JSON.stringify([defaultUser]));
      }
    // Fix: Changed catch(error) to catch(e: any) to avoid potential naming conflicts and type issues with strict configurations.
    } catch (e: any) {
      console.error("Failed to parse data from localStorage", e);
    }
  }, []);

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating >= 4) {
      const newFeedback: FeedbackEntry = {
        rating: selectedRating,
        name: '',
        feedback: '',
        date: new Date().toISOString(),
      };
      const updatedFeedback = [...allFeedback, newFeedback];
      setAllFeedback(updatedFeedback);
      localStorage.setItem('feedbackSubmissions', JSON.stringify(updatedFeedback));
      
      window.open('https://reviewthis.biz/LotusCare', '_blank', 'noopener,noreferrer');
      
      setSuccessContent({
        title: 'Thank You!',
        description: 'We appreciate you taking the time to share your experience.'
      });
      setView('success');
    } else {
      setView('form');
    }
  };

  const handleSubmitFeedback = useCallback(async () => {
    if (name.trim().length === 0 || feedback.trim().length === 0) {
      alert('Please fill out your name and review.');
      return;
    }
    setSubmissionStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // To test the error case, you can uncomment the following line:
      // throw new Error("Simulated API Error");

      const newFeedback: FeedbackEntry = {
        rating: rating!,
        name,
        feedback,
        date: new Date().toISOString(),
      };

      const updatedFeedback = [...allFeedback, newFeedback];
      setAllFeedback(updatedFeedback);
      localStorage.setItem('feedbackSubmissions', JSON.stringify(updatedFeedback));
      
      setSuccessContent({
        title: 'Feedback Submitted',
        description: 'Thank you for your valuable feedback. We will use it to improve our service.',
      });
      setSubmissionStatus('success');
      setView('success');
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setSubmissionStatus('error');
    }
  }, [rating, name, feedback, allFeedback]);

  const handleLogin = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user.email);
    } else {
      alert('Invalid credentials. Please try again or sign up.');
    }
  };

  const handleSignUp = (email: string, pass: string) => {
    if (users.find(user => user.email === email)) {
      alert('An account with this email already exists.');
      return;
    }
    const newUser: User = { email, password: pass };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
    setCurrentUser(email); 
    alert('Account created successfully!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const renderFeedbackFlow = () => {
    switch (view) {
      case 'rating':
        return (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">How was your experience?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Let us know how we did.</p>
            <StarRating onRatingSelect={handleRatingSelect} />
          </div>
        );
      case 'form':
        return (
          <FeedbackForm
            rating={rating!}
            name={name}
            feedback={feedback}
            onNameChange={(e) => setName(e.target.value)}
            onFeedbackChange={(e) => setFeedback(e.target.value)}
            onSubmit={handleSubmitFeedback}
            status={submissionStatus}
          />
        );
      case 'success':
        return <SubmissionSuccess 
                title={successContent.title}
                description={successContent.description}
              />;
      default:
        return null;
    }
  };
  
  const navigateHome = () => {
    setCurrentPage('feedback');
    setAdminView('login');
  }

  if (currentPage === 'admin') {
    return (
       <main className="min-h-screen flex items-center justify-center p-4 font-sans">
         {currentUser ? (
            <AdminDashboard
              feedbackData={allFeedback}
              onLogout={handleLogout}
              onNavigateHome={navigateHome}
              currentUserEmail={currentUser}
            />
          ) : (
            adminView === 'login' ? (
              <AdminLogin
                onLogin={handleLogin}
                onNavigateHome={navigateHome}
                onSwitchToSignUp={() => setAdminView('signup')}
              />
            ) : (
              <AdminSignUp
                onSignUp={handleSignUp}
                onNavigateHome={navigateHome}
                onSwitchToLogin={() => setAdminView('login')}
              />
            )
          )}
       </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
          {renderFeedbackFlow()}
        </div>
         <div className="text-center mt-4">
            <button
              onClick={() => setCurrentPage('admin')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium transition-colors"
              aria-label="Navigate to Admin Portal"
            >
              Admin Portal
            </button>
          </div>
      </div>
    </main>
  );
};

export default App;