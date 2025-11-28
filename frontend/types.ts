export enum NoteType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  VIDEO = 'VIDEO'
}

export enum ViewMode {
  TEXT = 'TEXT',
  IMAGES = 'IMAGES',
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  AI_SUMMARY = 'AI_SUMMARY'
}

export interface Note {
  id: string;
  title: string;
  type: NoteType;
  // Add these two fields to match your database
  content?: string; // For text notes
  url?: string;     // For PDF, Image, Video
  chapterId?: string;
  createdAt?: string;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  notes?: Note[]; // Optional for list views, populated in detailed views
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  semesterId: string;
  chapters?: Chapter[];
  createdAt: string;
}

export interface Semester {
  id: string;
  name: string;
  order: number;
  subjects?: Subject[];
  createdAt: string;
}

// For UI state
export interface User {
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
}