import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../lib/db';
import { Semester, Subject, Chapter } from '../types';
import { ChevronRight, FileText, Home, Loader } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getChaptersBySubjectApi, getSemestersByIdApi, getSubjectsByIdApi } from '@/api/api';

export const SubjectPage: React.FC = () => {
  const { semId, subjectId } = useParams<{ semId: string; subjectId: string }>();
  
  const [semester, setSemester] = useState<Semester | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (semId && subjectId) {
        const load = async () => {
            const sem = await getSemestersByIdApi(semId);
            const sub = await getSubjectsByIdApi(subjectId);
            const chaps = await getChaptersBySubjectApi(subjectId);
            
            setSemester(sem || null);
            if (sub) {
                setSubject({ ...sub, chapters: chaps });
            }
            setLoading(false);
        };
        load();
    }
  }, [semId, subjectId]);

  if (loading) return <div className="p-12 text-center dark:text-white"> <div><Loader className="animate-spin h-20 w-20 text-gray-500 mx-auto" /></div></div>;
  if (!semester || !subject) return <div className="p-8 text-center dark:text-white">Subject not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={`${subject.name} - ${semester.name}`}
        description={`Comprehensive notes and chapters for ${subject.name} (${semester.name}). Access study materials, PDFs, and video tutorials.`}
        keywords={`${subject.name} notes, ${subject.name} csit, ${semester.name} notes, study material`}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 dark:text-slate-400 mb-8">
        <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center"><Home className="h-4 w-4 mr-1"/> Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to={`/semester/${semId}`} className="hover:text-primary-600 dark:hover:text-primary-400">{semester.name}</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 dark:text-white font-medium">{subject.name}</span>
      </nav>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 mb-10 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-bold mb-3">
                CSIT
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{subject.name}</h1>
            <p className="text-gray-500 dark:text-slate-400 max-w-2xl">Browse chapters and resources for this subject.</p>
          </div>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-slate-400">
             <div className="flex items-center gap-1"><FileText className="h-4 w-4" /> {subject.chapters?.length || 0} Chapters</div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Chapters</h2>
      <div className="space-y-4">
        {subject.chapters && subject.chapters.length > 0 ? (
            subject.chapters.map((chapter, idx) => (
            <Link 
                key={chapter.id} 
                to={`/chapter/${chapter.id}`}
                className="block group"
            >
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600/50 transition-all duration-300 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-colors font-bold">
                        {idx + 1}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">{chapter.name}</h3>
                        <div className="flex gap-3 mt-1 text-xs text-gray-400 dark:text-slate-500">
                            {chapter.notes?.length} resources available
                        </div>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 dark:text-slate-600 group-hover:text-primary-500 dark:group-hover:text-primary-400 transform group-hover:translate-x-1 transition-all" />
                </div>
            </Link>
            ))
        ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
                <p className="text-gray-500 dark:text-slate-500">No chapters available for this subject.</p>
            </div>
        )}
      </div>
    </div>
  );
};