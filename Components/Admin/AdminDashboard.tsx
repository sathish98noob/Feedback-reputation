import React from 'react';
import { FeedbackEntry } from '../../types';
import StarIcon from '../icons/StarIcon';

interface AdminDashboardProps {
  feedbackData: FeedbackEntry[];
  onLogout: () => void;
  onNavigateHome: () => void;
  currentUserEmail: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ feedbackData, onLogout, onNavigateHome, currentUserEmail }) => {
  
  const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString();
  const formatTime = (isoString:string) => new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleExport = () => {
    if (feedbackData.length === 0) {
      alert("No feedback to export.");
      return;
    }

    const headers = ['Date', 'Time', 'Name', 'Rating', 'Feedback'];
    
    const escapeCSV = (str: string | number) => {
      const stringVal = String(str);
      if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    };
    
    const csvContent = [
      headers.join(','),
      ...feedbackData.map(item => [
        escapeCSV(formatDate(item.date)),
        escapeCSV(formatTime(item.date)),
        escapeCSV(item.name),
        escapeCSV(item.rating),
        escapeCSV(item.feedback)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      const today = new Date().toISOString().slice(0, 10);
      link.setAttribute("href", url);
      link.setAttribute("download", `feedback-export-${today}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 flex flex-col" style={{minHeight: '400px', maxHeight: '80vh'}}>
      <div className="flex justify-between items-center mb-2 pb-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">Feedback Submissions</h2>
        <div>
          <button onClick={onNavigateHome} className="text-sm text-blue-600 hover:underline dark:text-blue-400 mr-4">
            Back to Site
          </button>
          <button onClick={onLogout} className="text-sm text-red-600 hover:underline dark:text-red-400">
            Logout
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
         <div className="flex items-center space-x-2">
            <button
              onClick={handleExport}
              className="px-3 py-1 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Export CSV
            </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Logged in as: <strong>{currentUserEmail}</strong>
        </p>
      </div>
      
      <div className="flex-grow overflow-y-auto pr-2 relative">
        {feedbackData.length > 0 ? (
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400 sticky top-0">
              <tr>
                <th scope="col" className="py-3 px-6">Date</th>
                <th scope="col" className="py-3 px-6">Time</th>
                <th scope="col" className="py-3 px-6">Name</th>
                <th scope="col" className="py-3 px-6">Rating</th>
                <th scope="col" className="py-3 px-6">Review</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.slice().reverse().map((item) => (
                <tr key={item.date} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/20">
                  <td className="py-4 px-6 whitespace-nowrap">{formatDate(item.date)}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{formatTime(item.date)}</td>
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    {item.name ? item.name : <span className="text-slate-400 dark:text-slate-500 italic">N/A</span>}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                       {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {item.feedback ? item.feedback : <span className="text-slate-400 dark:text-slate-500 italic">High rating, no text feedback.</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">
            <p className="text-slate-500 dark:text-slate-400">No feedback has been submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;