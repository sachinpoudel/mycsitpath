import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight } from 'lucide-react';
import { Semester } from '../types';

interface SemesterCardProps {
  semester: Semester;
}

export const SemesterCard: React.FC<SemesterCardProps> = ({ semester }) => {
  return (
    <Link to={`/semester/${semester.id}`} className="block group">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-600/50 transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-50 dark:bg-slate-700 rounded-xl text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <Book className="h-6 w-6" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 dark:text-slate-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
            {semester.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {semester.subjects ? semester.subjects.length : 5} Subjects • CSIT
          </p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-primary-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
};