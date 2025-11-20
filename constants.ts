import { Semester, NoteType } from './types';

const CURRENT_DATE = new Date().toISOString();

export const MOCK_SEMESTERS: Semester[] = [
  {
    id: '1',
    name: 'Semester 1',
    order: 1,
    createdAt: CURRENT_DATE,
    subjects: [
      {
        id: 'cs101',
        name: 'Introduction to IT',
        semesterId: '1',
        createdAt: CURRENT_DATE,
        chapters: [
          {
            id: 'ch1',
            name: 'Chapter 1: Introduction to Computers',
            subjectId: 'cs101',
            createdAt: CURRENT_DATE,
            notes: [
              {
                id: 'n1',
                chapterId: 'ch1',
                type: NoteType.TEXT,
                text: '# Introduction to Computers\n\nA computer is an electronic device that manipulates information, or data. It has the ability to store, retrieve, and process data.\n\n## Key Characteristics\n- **Speed**: Computers work at incredible speeds.\n- **Accuracy**: Computers provide 100% accuracy if input is correct.\n- **Diligence**: A computer can perform millions of calculations with the same consistency.\n\n## Basic Components\n1. Input Unit\n2. CPU (Central Processing Unit)\n3. Output Unit',
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
              },
              {
                id: 'n2',
                chapterId: 'ch1',
                type: NoteType.IMAGE,
                imageUrls: ['https://picsum.photos/800/400?random=1', 'https://picsum.photos/800/400?random=2'],
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
              },
              {
                id: 'n3',
                chapterId: 'ch1',
                type: NoteType.VIDEO,
                videoUrls: ['https://www.youtube.com/embed/AkFi90lZmXA'],
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
              }
            ]
          },
          {
            id: 'ch2',
            name: 'Chapter 2: Number Systems',
            subjectId: 'cs101',
            createdAt: CURRENT_DATE,
            notes: [
              {
                id: 'n4',
                chapterId: 'ch2',
                type: NoteType.TEXT,
                text: '# Number Systems\n\nIn digital electronics, the number system is used for representing information. The number system has different bases.\n\n- **Binary**: Base 2 (0, 1)\n- **Octal**: Base 8 (0-7)\n- **Decimal**: Base 10 (0-9)\n- **Hexadecimal**: Base 16 (0-9, A-F)',
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
              },
              {
                id: 'n5',
                chapterId: 'ch2',
                type: NoteType.PDF,
                pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
              }
            ]
          }
        ]
      },
      {
        id: 'math101',
        name: 'Mathematics I',
        semesterId: '1',
        createdAt: CURRENT_DATE,
        chapters: [
          {
            id: 'ch1_math',
            name: 'Chapter 1: Limits and Continuity',
            subjectId: 'math101',
            createdAt: CURRENT_DATE,
            notes: [
              {
                id: 'n6',
                chapterId: 'ch1_math',
                type: NoteType.TEXT,
                text: 'Understanding limits is fundamental to calculus...',
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
              },
              {
                id: 'n7',
                chapterId: 'ch1_math',
                type: NoteType.VIDEO,
                videoUrls: ['https://www.youtube.com/embed/RiXaQ29aIv8'],
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
              }
            ]
          }
        ]
      },
      {
        id: 'phy101',
        name: 'Physics',
        semesterId: '1',
        createdAt: CURRENT_DATE,
        chapters: []
      }
    ]
  },
  { id: '2', name: 'Semester 2', order: 2, createdAt: CURRENT_DATE, subjects: [] },
  { id: '3', name: 'Semester 3', order: 3, createdAt: CURRENT_DATE, subjects: [] },
  { id: '4', name: 'Semester 4', order: 4, createdAt: CURRENT_DATE, subjects: [] },
  { id: '5', name: 'Semester 5', order: 5, createdAt: CURRENT_DATE, subjects: [] },
  { id: '6', name: 'Semester 6', order: 6, createdAt: CURRENT_DATE, subjects: [] },
  { id: '7', name: 'Semester 7', order: 7, createdAt: CURRENT_DATE, subjects: [] },
  { id: '8', name: 'Semester 8', order: 8, createdAt: CURRENT_DATE, subjects: [] },
];