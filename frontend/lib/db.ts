import { Semester, Subject, Chapter, Note, NoteType } from '../types';

const STORAGE_KEY = 'hamro_notes_db';

interface DB {
  semesters: Semester[];
  subjects: Subject[];
  chapters: Chapter[];
  notes: Note[];
}

const INITIAL_DATA: DB = {
  semesters: Array.from({ length: 8 }, (_, i) => ({
    id: `sem-${i + 1}`,
    name: `Semester ${i + 1}`,
    order: i + 1,
    createdAt: new Date().toISOString(),
  })),
  subjects: [
    {
      id: 'sub-1',
      name: 'Introduction to IT',
      semesterId: 'sem-1',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sub-2',
      name: 'C Programming',
      semesterId: 'sem-1',
      createdAt: new Date().toISOString(),
    },
    {
        id: 'sub-3',
        name: 'Digital Logic',
        semesterId: 'sem-1',
        createdAt: new Date().toISOString(),
      },
  ],
  chapters: [
    {
      id: 'chap-1',
      name: 'Chapter 1: Computer Basics',
      subjectId: 'sub-1',
      createdAt: new Date().toISOString(),
    },
    {
        id: 'chap-2',
        name: 'Chapter 2: Number Systems',
        subjectId: 'sub-1',
        createdAt: new Date().toISOString(),
      },
  ],
  notes: [
    {
      id: 'note-1',
      chapterId: 'chap-1',
      type: NoteType.TEXT,
      text: '# Computer Basics\n\nA computer is an electronic device...',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'note-2',
      chapterId: 'chap-1',
      type: NoteType.VIDEO,
      videoUrls: ['https://www.youtube.com/embed/AkFi90lZmXA'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
};

const getDB = (): DB => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  return JSON.parse(stored);
};

const saveDB = (db: DB) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

// Simulate Async DB Calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const db = {
  semesters: {
    getAll: async () => {
      await delay(100);
      const db = getDB();
      return db.semesters.sort((a, b) => a.order - b.order).map(s => ({
        ...s,
        subjects: db.subjects.filter(sub => sub.semesterId === s.id)
      }));
    },
    getById: async (id: string) => {
      await delay(100);
      const db = getDB();
      return db.semesters.find((s) => s.id === id);
    },
    create: async (data: { name: string; order: number }) => {
      await delay(300);
      const db = getDB();
      const newSem: Semester = {
        id: `sem-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      db.semesters.push(newSem);
      saveDB(db);
      return newSem;
    },
    delete: async (id: string) => {
      await delay(300);
      const db = getDB();
      db.semesters = db.semesters.filter(s => s.id !== id);
      saveDB(db);
    }
  },
  subjects: {
    getBySemester: async (semesterId: string) => {
      await delay(100);
      const db = getDB();
      return db.subjects.filter((s) => s.semesterId === semesterId).map(s => ({
        ...s,
        chapters: db.chapters.filter(c => c.subjectId === s.id)
      }));
    },
    getById: async (id: string) => {
        await delay(100);
        const db = getDB();
        return db.subjects.find(s => s.id === id);
    },
    create: async (data: { name: string; semesterId: string }) => {
      await delay(300);
      const db = getDB();
      const newSub: Subject = {
        id: `sub-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      db.subjects.push(newSub);
      saveDB(db);
      return newSub;
    },
    delete: async (id: string) => {
        await delay(300);
        const db = getDB();
        db.subjects = db.subjects.filter(s => s.id !== id);
        saveDB(db);
    }
  },
  chapters: {
    getBySubject: async (subjectId: string) => {
      await delay(100);
      const db = getDB();
      return db.chapters.filter((c) => c.subjectId === subjectId).map(c => ({
          ...c,
          notes: db.notes.filter(n => n.chapterId === c.id)
      }));
    },
    getById: async (id: string) => {
        await delay(100);
        const db = getDB();
        const chapter = db.chapters.find(c => c.id === id);
        if (!chapter) return null;
        return {
            ...chapter,
            notes: db.notes.filter(n => n.chapterId === chapter.id)
        }
    },
    create: async (data: { name: string; subjectId: string }) => {
      await delay(300);
      const db = getDB();
      const newChap: Chapter = {
        id: `chap-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      db.chapters.push(newChap);
      saveDB(db);
      return newChap;
    },
    delete: async (id: string) => {
        await delay(300);
        const db = getDB();
        db.chapters = db.chapters.filter(c => c.id !== id);
        saveDB(db);
    }
  },
  notes: {
    getByChapter: async (chapterId: string) => {
        await delay(100);
        const db = getDB();
        return db.notes.filter(n => n.chapterId === chapterId);
    },
    create: async (data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      await delay(500);
      const db = getDB();
      const newNote: Note = {
        id: `note-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.notes.push(newNote);
      saveDB(db);
      return newNote;
    },
    delete: async (id: string) => {
      await delay(300)
      const db = getDB();
      db.notes = db.notes.filter(n => n.id !== id);
      saveDB(db);
    }
  },
};
