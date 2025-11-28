import React from 'react';
import {  Routes, Route, Outlet, BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { SemesterPage } from './pages/SemesterPage';
import { SubjectPage } from './pages/SubjectPage';
import { ChapterPage } from './pages/ChapterPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { Login } from './pages/Login';

// Admin
import { AdminLayout } from './layouts/AdminLayout';
import { AdminSemesters } from './pages/admin/Semesters';
import { AdminSubjects } from './pages/admin/Subjects';
import { AdminChapters } from './pages/admin/Chapters';
import { AdminNotes } from './pages/admin/Notes';
import { AdminPage } from './pages/AdminPage';
import TeamPage from './pages/TeamPage';

// Public Layout
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 font-sans transition-colors duration-300">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Admin Dashboard Index
const AdminDashboard = () => (
    <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome back, Admin!</h2>
        <p className="text-slate-500">Use the sidebar to manage your content.</p>
    </div>
);

const App: React.FC = () => {
  return (
  
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="semester/:semId" element={<SemesterPage />} />
          <Route path="semester/:semId/subject/:subjectId" element={<SubjectPage />} />
          <Route path="chapter/:chapterId" element={<ChapterPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="semesters" element={<AdminSemesters />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="chapters" element={<AdminChapters />} />
            <Route path="notes" element={<AdminNotes />} />
        </Route>
      </Routes>
   
  );
};

export default App;