import React from 'react';
import { Github, Twitter, Facebook, Lock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
             <span className="text-lg font-bold text-gray-800 dark:text-white">mycsitpath</span>
             <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">© {new Date().getFullYear()} mycsitpath. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/feedback" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1" title="Give Feedback">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Feedback</span>
            </Link>
            <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
            <Link to="/login" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" title="Admin Login">
              <Lock className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};