import React from 'react'
import ChromaGrid from '../components/ui/ChromeGrid';

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

        {/* Grid Container - Needs height for the absolute positioning of ChromaGrid */}
        <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl shadow-2xl dark:border-slate-700 overflow-hidden backdrop-blur-sm mt-3">
          <ChromaGrid 
            items={items}
            radius={250} // Adjusted radius for better fit
            damping={0.1} // Lower damping for smoother movement
            fadeOut={0.8}
            ease="back.out(1.7)"
          />
        </div>
      </div>
    </div>
  )
}

export default TeamPage