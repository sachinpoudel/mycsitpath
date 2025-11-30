import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../lib/db';
import { Chapter, Subject } from '../types';
import { NotesViewer } from '../components/NotesViewer';
import { ArrowLeft, Loader } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getChaptersByIdApi, getSubjectsByIdApi } from '@/api/api';

export const ChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chapterId) {
        const load = async () => {
            const chap = await getChaptersByIdApi(chapterId);
            if (chap) {
                setChapter(chap);
                const realSubjectId = (chap as any).subjectId || chap.subject_id;
                const sub = await getSubjectsByIdApi(realSubjectId);
                setSubject(sub || null);
            }
            setLoading(false);
        };
        load();
    }
  }, [chapterId]);

  if (loading) return <div className="p-12 text-center dark:text-white"> <div><Loader className="animate-spin h-20 w-20 text-gray-500 mx-auto" /></div></div>;
  if (!chapter || !subject) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center dark:text-white">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Chapter Not Found</h2>
            <button onClick={() => navigate(-1)} className="text-primary-600 dark:text-primary-400 hover:underline">Go Back</button>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
       <SEO 
        title={`${chapter.name} - ${subject.name}`}
        description={`Read notes for ${chapter.name} in ${subject.name}. Available in Text, PDF, Image, and Video formats on mycsitpath.`}
       />
       <div className="mb-6">
        <Link to={`/semester/${subject.semesterId}/subject/${subject.id}`} className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to {subject.name}
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                 <span className="text-primary-600 dark:text-primary-400 font-medium text-sm tracking-wide uppercase">{subject.name}</span>
                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">{chapter.name}</h1>
            </div>
        </div>
      </div>

      <NotesViewer chapter={chapter} />
    </div>
  );
};