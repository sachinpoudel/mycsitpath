import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  semesterId: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, semesterId }) => {
  return (
    <Link to={`/semester/${semesterId}/subject/${subject.id}`} className="flex flex-col h-full group">
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-600/50 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-[0.03] group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity">
           <BookOpen className="h-24 w-24 text-primary-600 dark:text-primary-400 transform rotate-12" />
        </div>
        
        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                SUBJECT
                </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                {subject.name}
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 line-clamp-2">
                {subject.chapters ? `${subject.chapters.length} Chapters` : 'No chapters yet'}
            </p>

            <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium mt-auto">
                View Chapters <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
      </div>
    </Link>
  );
};