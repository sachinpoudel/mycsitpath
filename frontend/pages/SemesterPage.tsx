import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../lib/db';
import { Semester } from '../types';
import { SubjectCard } from '../components/SubjectCard';
import { ArrowLeft, Loader } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getSemestersApi, getSemestersByIdApi, getSubjectsBySemesterApi } from '@/api/api';

export const SemesterPage: React.FC = () => {
  const { semId } = useParams<{ semId: string }>();
  const [semester, setSemester] = useState<Semester | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (semId) {
        const load = async () => {
            const sem = await  getSemestersByIdApi(semId)
            console.log(sem); 
            if (sem) {
                const subjects = await getSubjectsBySemesterApi(semId);
                console.log(subjects);
                setSemester({ ...sem, subjects: subjects.data });
            }
            setLoading(false);
        };      
        load();
    }
  }, [semId]);

  if (loading) return <div className="p-12 text-center dark:text-white"> <div><Loader className="animate-spin h-20 w-20 text-gray-500 mx-auto" /></div></div>;
  if (!semester) return <div className="p-8 text-center dark:text-white">Semester not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={`${semester.name} Subjects`}
        description={`Browse all subjects for ${semester.name} of BSc CSIT. Find notes, syllabus, and resources for all ${semester.name} subjects.`}
        keywords={`csit ${semester.name}, ${semester.name} notes, bsc csit subjects`}
      />
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{semester.name} Subjects</h1>
        <p className="text-gray-500 dark:text-slate-400">Select a subject to view chapters and notes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {semester.subjects && semester.subjects.length > 0 ? (
          semester.subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} semesterId={semester.id} />
          ))
        ) : (
          <div className="col-span-full bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-dashed border-gray-300 dark:border-slate-700">
             <p className="text-gray-400 dark:text-slate-500 text-lg">No subjects added for this semester yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};