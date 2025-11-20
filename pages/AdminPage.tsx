import React, { useState } from 'react';
import { PlusCircle, UploadCloud, AlertCircle } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subject' | 'chapter'>('chapter');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a demo environment. In the real app, this would send data to the MongoDB API.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                    <UploadCloud className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <p className="text-gray-500">Manage content, upload notes, and organize semesters.</p>
        </div>

        <div className="flex border-b border-gray-200">
            <button 
                onClick={() => setActiveTab('chapter')}
                className={`flex-1 py-4 text-sm font-medium text-center border-b-2 ${activeTab === 'chapter' ? 'border-primary-500 text-primary-700 bg-primary-50/30' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Add New Chapter
            </button>
            <button 
                onClick={() => setActiveTab('subject')}
                className={`flex-1 py-4 text-sm font-medium text-center border-b-2 ${activeTab === 'subject' ? 'border-primary-500 text-primary-700 bg-primary-50/30' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Add New Subject
            </button>
        </div>

        <div className="p-8">
            {activeTab === 'chapter' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Semester</label>
                            <select className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 border bg-white">
                                <option>Semester 1</option>
                                <option>Semester 2</option>
                                <option>Semester 3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
                            <select className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 border bg-white">
                                <option>Introduction to IT</option>
                                <option>C Programming</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Title</label>
                        <input type="text" className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 border" placeholder="e.g., Chapter 5: Pointers" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes Content (Markdown)</label>
                        <textarea rows={6} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 border font-mono text-sm" placeholder="# Chapter Title..." />
                    </div>

                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                            <span className="font-semibold">Note:</span> This is a frontend demo. In a full implementation, this form would connect to the Next.js API routes and MongoDB to store the data permanently.
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all">
                            <PlusCircle className="h-5 w-5 mr-2" />
                            Create Chapter
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">Subject addition form would go here.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
