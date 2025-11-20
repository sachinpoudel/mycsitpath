import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'suggestion',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus('submitting');
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setFormData({ type: 'suggestion', message: '' });
    
    // Reset status after 5 seconds to allow another submission or keep showing success
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <SEO 
        title="Feedback & Suggestions"
        description="Share your anonymous feedback, suggestions, or report bugs to help us improve mycsitpath."
      />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 mb-4">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Anonymous Feedback</h1>
          <p className="text-gray-500 dark:text-slate-400">
            Help us improve mycsitpath. Your suggestions and reports are completely anonymous.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden p-8">
          {status === 'success' ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 mb-4">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
              <p className="text-gray-500 dark:text-slate-400 mb-8">Your feedback has been received anonymously.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-6 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 hover:underline"
              >
                Send another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Feedback Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all cursor-pointer"
                >
                  <option value="suggestion">Feature Suggestion</option>
                  <option value="bug">Report a Bug</option>
                  <option value="content">Content Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center text-xs text-gray-400 dark:text-slate-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>100% Anonymous</span>
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting' || !formData.message.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-500/20"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="-ml-1 mr-2 h-5 w-5" />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};