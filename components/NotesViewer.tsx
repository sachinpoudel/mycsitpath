import React, { useState } from 'react';
import { Chapter, NoteType, ViewMode } from '../types';
import { FileText, Image as ImageIcon, FileIcon, Video, MessageSquare, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateSummary, askQuestion } from '../services/geminiService';

interface NotesViewerProps {
  chapter: Chapter;
}

export const NotesViewer: React.FC<NotesViewerProps> = ({ chapter }) => {
  const [activeTab, setActiveTab] = useState<ViewMode>(ViewMode.TEXT);
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  // Filter notes by type
  const textNotes = chapter.notes?.filter(n => n.type === NoteType.TEXT) || [];
  const imageNotes = chapter.notes?.filter(n => n.type === NoteType.IMAGE) || [];
  const videoNotes = chapter.notes?.filter(n => n.type === NoteType.VIDEO) || [];
  const pdfNotes = chapter.notes?.filter(n => n.type === NoteType.PDF) || [];

  // Combine all text for AI context
  const fullTextContent = textNotes.map(n => n.text).join('\n\n');

  const handleSummarize = async () => {
    if (summary) return;
    if (!fullTextContent) return;
    setIsSummarizing(true);
    const result = await generateSummary(fullTextContent);
    setSummary(result);
    setIsSummarizing(false);
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || !fullTextContent) return;
    setIsAsking(true);
    const result = await askQuestion(fullTextContent, aiQuestion);
    setAiAnswer(result);
    setIsAsking(false);
  };

  const tabs = [
    { id: ViewMode.TEXT, label: 'Text Notes', icon: FileText },
    { id: ViewMode.IMAGES, label: 'Images', icon: ImageIcon },
    { id: ViewMode.PDF, label: 'PDFs', icon: FileIcon },
    { id: ViewMode.VIDEO, label: 'Videos', icon: Video },
    { id: ViewMode.AI_SUMMARY, label: 'AI Assist', icon: Sparkles },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden min-h-[600px] transition-colors duration-300">
      <div className="border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
        <nav className="flex -mb-px" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === ViewMode.AI_SUMMARY) handleSummarize();
              }}
              className={`
                whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/10'
                    : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-600'
                }
              `}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 lg:p-8">
        {activeTab === ViewMode.TEXT && (
          <div className="prose prose-indigo dark:prose-invert max-w-none">
            {textNotes.length > 0 ? (
                textNotes.map(note => (
                    <div key={note.id} className="mb-8">
                         <ReactMarkdown>{note.text || ''}</ReactMarkdown>
                    </div>
                ))
            ) : (
              <div className="text-center text-gray-400 dark:text-slate-500 py-12">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No text notes available for this chapter.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === ViewMode.IMAGES && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {imageNotes.length > 0 ? (
              imageNotes.flatMap(note => note.imageUrls || []).map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                  <img src={img} alt={`Note ${idx + 1}`} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 dark:text-slate-500 py-12">
                <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No images available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === ViewMode.PDF && (
          <div className="space-y-4">
            {pdfNotes.length > 0 ? (
              pdfNotes.map((note, idx) => (
                <div key={note.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 transition-colors bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg">
                        <FileIcon className="h-6 w-6" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-slate-200">PDF Document {idx + 1}</span>
                  </div>
                  <a 
                    href={note.pdfUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    Open PDF
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 dark:text-slate-500 py-12">
                <FileIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No PDFs available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === ViewMode.VIDEO && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {videoNotes.length > 0 ? (
              videoNotes.flatMap(note => note.videoUrls || []).map((video, idx) => (
                <div key={idx} className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm">
                  <iframe 
                    src={video} 
                    title={`Video ${idx}`} 
                    className="w-full h-full min-h-[300px]" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 dark:text-slate-500 py-12">
                <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No videos available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === ViewMode.AI_SUMMARY && (
          <div className="space-y-8 max-w-3xl mx-auto">
             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-200">Smart Summary</h3>
                </div>
                {isSummarizing ? (
                     <div className="flex items-center space-x-2 text-indigo-500 dark:text-indigo-400 animate-pulse">
                        <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animation-delay-200"></div>
                        <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animation-delay-400"></div>
                        <span>Generating summary...</span>
                     </div>
                ) : (
                    <div className="prose prose-sm prose-indigo dark:prose-invert">
                        <ReactMarkdown>{summary}</ReactMarkdown>
                        {!summary && <p className="text-gray-500 dark:text-slate-400 italic">Switch to this tab to generate a summary.</p>}
                    </div>
                )}
             </div>

             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                    Ask AI about this Chapter
                </h3>
                <form onSubmit={handleAskQuestion} className="flex gap-3 mb-4">
                    <input 
                        type="text" 
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        placeholder="e.g., Explain the CPU part..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                    />
                    <button 
                        type="submit" 
                        disabled={isAsking || !aiQuestion}
                        className="bg-primary-600 text-white px-6 py-2 rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors font-medium"
                    >
                        {isAsking ? 'Thinking...' : 'Ask'}
                    </button>
                </form>
                {aiAnswer && (
                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl text-gray-800 dark:text-slate-200 text-sm leading-relaxed border border-gray-100 dark:border-slate-700">
                        <ReactMarkdown>{aiAnswer}</ReactMarkdown>
                    </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};