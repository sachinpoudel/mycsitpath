import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, MonitorPlay, Zap, ArrowRight } from 'lucide-react';
import { SemesterCard } from '../components/SemesterCard';
import { db } from '../lib/db';
import { Semester } from '../types';
import { SEO } from '../components/SEO';
import { getSemestersApi } from '@/api/api';


import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import SplashCursor from '@/components/ui/SplashCursor';

export function LayoutTextFlipDemo() {
  return (
    <div>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
       
          words={["Aceternity UI", "Fight Club", "The Matrix", "The Jungle"]}
        />
      </motion.div>
      
    </div>
  );
}


export const Home: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadSemesters = async () => {
      try {
        const data = await getSemestersApi();
        const sorted = (data || []).sort((a: Semester, b: Semester) => a.order - b.order);
        setSemesters(sorted);
      } catch (error) {
        console.error("Failed to load semesters", error);
      } finally {
        setLoading(false);
      }
    };
    loadSemesters();
  }, []);

  return (
    <div className="space-y-16 pb-16 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <SEO 
        title="Home" 
        description="The ultimate notes sharing platform for CSIT students. Access organized semester notes, chapters, PDFs, and videos."
        />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 overflow-hidden min-h-[600px] flex items-center">
        <SplashCursor/>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm">
               For CSIT Students, By CSIT Students
            </span>
            {/* <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-tight">
              Master Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                CSIT Journey
              </span>
            </h1> */}

 <div className="text-6xl md:text-7xl font-black text-white tracking-tight mb-8 leading-tight flex flex-col items-center text-bold">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <LayoutTextFlip words={["Master", "Excel", "Level", "Leap"]} />
                <span>Your</span>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient ml-2">
                CSIT Journey
              </span>
            </div>


            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Access organized notes, chapters, PDFs, and curated video resources for every semester. <span className="text-white font-semibold">mycsitpath</span> is your ultimate academic companion.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {semesters.length > 0 && (
                  <Link
                    to={`/semester/${semesters[0].id}`}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-primary-500/25 transform hover:-translate-y-1"
                  >
                    Browse Notes <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Layers, title: 'Semester-wise Structure', desc: 'Perfectly organized content from Semester 1 to 8.' },
            { icon: MonitorPlay, title: 'Multimedia Learning', desc: 'Text notes, diagrams, PDFs, and video tutorials.' },
            { icon: Zap, title: 'Fast & AI Optimized', desc: 'Clean UI with AI summaries for quick revision.' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center p-4 bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Semesters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Browse by Semester</h2>
             <p className="text-gray-500 dark:text-slate-400 mt-2">Select your current semester to view subjects.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesters.map((sem) => (
            <SemesterCard key={sem.id} semester={sem} />
          ))}
        </div>
      </div>
    </div>
  );
};