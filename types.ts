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
  chapterId: string;
  type: NoteType;
  text?: string; // Rich text or content
  imageUrls?: string[];
  pdfUrl?: string;
  videoUrls?: string[];
  createdAt: string;
  updatedAt: string;
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