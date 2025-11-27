import React from 'react'
import { motion } from 'motion/react';

const items = [
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarah",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mike",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Alex Design",
    subtitle: "UI/UX Designer",
    handle: "@alex",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(180deg, #8B5CF6, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Emily Rose",
    subtitle: "Content Manager",
    handle: "@emily",
    borderColor: "#EC4899",
    gradient: "linear-gradient(180deg, #EC4899, #000)",
    url: "#"
  },
   {
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "David Kim",
    subtitle: "DevOps Engineer",
    handle: "@david",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(180deg, #F59E0B, #000)",
    url: "#"
  }
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-20 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">Team</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            The passionate individuals behind mycsitpath working to make CSIT education accessible for everyone.
          </p>
        </div>

        {/* Responsive Grid Layout - Works on Mobile & Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
               {/* Gradient Background Effect */}
               <div 
                 className="absolute top-0 left-0 w-full h-24 opacity-20 transition-opacity group-hover:opacity-30"
                 style={{ background: item.gradient }}
               />
               
               <div className="relative flex flex-col items-center text-center mt-8">
                 <div className="relative">
                   <div className="absolute -inset-1 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity" style={{ background: item.gradient }}></div>
                   <img 
                    src={item.image} 
                    alt={item.title} 
                    className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md" 
                   />
                 </div>
                 
                 <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                 <p className="text-sm font-medium text-primary-500 mb-3">{item.subtitle}</p>
                 
                 <div className="mt-2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-600">
                      {item.handle}
                    </span>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamPage