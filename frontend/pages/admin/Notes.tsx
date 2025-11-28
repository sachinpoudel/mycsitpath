import React, { useEffect, useState } from 'react';
import { db } from '../../lib/db';
import { Semester, Subject, Chapter, Note, NoteType } from '../../types';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Card, CardHeader, CardTitle, CardContent, Label } from '../../components/ui/shadcn';
import { Trash2, Plus, FileType, Image, Video, Link, FileText } from 'lucide-react';
import { createNoteApi, getAllSubjectsApi, getChaptersApi, getNotesApi, getSemestersApi } from '@/api/api';
import { uploadFile } from '@/file/storage';



export const AdminNotes: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  
  const [selectedSemId, setSelectedSemId] = useState('');
  const [selectedSubId, setSelectedSubId] = useState('');
  const [selectedChapId, setSelectedChapId] = useState('');

  const [noteType, setNoteType] = useState<NoteType>(NoteType.TEXT);
  const [noteContent, setNoteContent] = useState(''); // For text or main URL
  const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null); // NEW: For File Uploads


  // Fetch Semesters
  useEffect(() => {
    const loadSemesters = async () => {
        const sems = await getSemestersApi();
        setSemesters(sems || []);
        if (sems.length > 0) setSelectedSemId(sems[0].id);
    };
    loadSemesters();
  }, []);

  // Fetch Subjects
  useEffect(() => {
    if (!selectedSemId) return;
    const loadSubjects = async () => {
        const subs = await getAllSubjectsApi();
        if(!subs) {
 const error = new Error("Failed to fetch subjects");
            throw error;
        }
        setSubjects(subs);
        if (subs.length > 0) setSelectedSubId(subs[0].id);
        else { setSelectedSubId(''); setChapters([]); }
    };
    loadSubjects();
  }, [selectedSemId]);

  // Fetch Chapters
  useEffect(() => {
    if (!selectedSubId) return;
    const loadChapters = async () => {
      try {
          const chaps = await getChaptersApi(selectedSubId);
        setChapters(chaps);
        if (chaps.length > 0) setSelectedChapId(chaps[0].id);
        else { setSelectedChapId(''); setNotes([]); }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    loadChapters();
  }, [selectedSubId]);

  // Fetch Notes
  useEffect(() => {
    if (!selectedChapId) return;
    fetchNotes();
  }, [selectedChapId]);

  const fetchNotes = async () => {
    setLoading(true);
    const data = await getNotesApi(selectedChapId);
    console.log(data);
    setNotes(data);
    setLoading(false);
  };

//  const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedChapId) return alert("Select a chapter first");

//     setLoading(true);
//     try {
//         const payload = {
//             chapter_id: selectedChapId,
//             type: noteType,
//             title: noteContent   || 'Untitled Note',
//             // If TEXT, save to content. If others, save to url.
//             content: noteType === NoteType.TEXT ? noteContent : null,
//             url: noteType !== NoteType.TEXT ? noteContent : null,
//         };

//         await createNoteApi(payload);
        
//         // Reset form
//         setNoteContent('');
//         fetchNotes();
//     } catch (error) {
//         alert("Failed to create note");
//     } finally {
//         setLoading(false);
//     }
//   };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapId) return alert("Select a chapter first");

    setLoading(true);
    try {
        let finalContentOrUrl = noteContent;

        if ((noteType === NoteType.PDF || noteType === NoteType.IMAGE) && selectedFile) {
            const uploadedUrl = await uploadFile(selectedFile);
            if (!uploadedUrl) {
                setLoading(false);
                console.log("File upload failed", uploadedUrl);
                return; // Stop if upload failed
            }
            finalContentOrUrl = uploadedUrl;
        }

        const payload = {
            chapter_id: selectedChapId,
            type: noteType,
            title: noteType === NoteType.TEXT ? 'Text Note' : (selectedFile?.name || 'Resource'),
           
            content: noteType === NoteType.TEXT ? noteContent : null,
            url: noteType !== NoteType.TEXT ? finalContentOrUrl : null,
        };

        await createNoteApi(payload);
        
        setNoteContent('');
        setSelectedFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
        
        fetchNotes();
    } catch (error) {
        alert("Failed to create note");
    } finally {
        setLoading(false);
    }
  };




  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this note?')) {
      await db.notes.delete(id);
      fetchNotes();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Notes</h1>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label>Semester</Label>
                    <select className="w-full mt-1 p-2 border rounded-md" value={selectedSemId} onChange={e => setSelectedSemId(e.target.value)}>
                        {semesters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                 <div>
                    <Label>Subject</Label>
                    <select className="w-full mt-1 p-2 border rounded-md" value={selectedSubId} onChange={e => setSelectedSubId(e.target.value)} disabled={!subjects.length}>
                        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                 <div>
                    <Label>Chapter</Label>
                    <select className="w-full mt-1 p-2 border rounded-md" value={selectedChapId} onChange={e => setSelectedChapId(e.target.value)} disabled={!chapters.length}>
                        {chapters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
            </div>
        </CardContent>
      </Card>

      {selectedChapId && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Chapter Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Preview</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notes.map(note => (
                                <TableRow key={note.id}>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                                            ${note.type === 'TEXT' ? 'bg-blue-100 text-blue-800' : 
                                              note.type === 'IMAGE' ? 'bg-purple-100 text-purple-800' : 
                                              note.type === 'VIDEO' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {note.type}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {note.type === 'TEXT' ? note.text?.substring(0, 50) : 
                                         note.type === 'IMAGE' ? 'Image URL...' :
                                         note.type === 'VIDEO' ? 'Video URL...' : 'PDF URL...'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(note.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {notes.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-slate-500">No notes yet.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add Note</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <Label>Type</Label>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {[
                                    { id: NoteType.TEXT, icon: FileText, label: 'Text' },
                                    { id: NoteType.IMAGE, icon: Image, label: 'Img' },
                                    { id: NoteType.PDF, icon: FileType, label: 'PDF' },
                                    { id: NoteType.VIDEO, icon: Video, label: 'Vid' },
                                ].map((t) => (
                                    <div 
                                        key={t.id}
                                        onClick={() => setNoteType(t.id)}
                                        className={`cursor-pointer flex flex-col items-center justify-center p-2 rounded-md border transition-all ${noteType === t.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-slate-200 hover:bg-slate-50'}`}
                                    >
                                        <t.icon className="h-5 w-5 mb-1" />
                                        <span className="text-xs">{t.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label>{noteType === 'TEXT' ? 'Content (Markdown)' : 'Resource URL'}</Label>
                            {/* {noteType === 'TEXT' ? (
                                <textarea 
                                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm min-h-[150px] mt-1"
                                    placeholder="# Note Title..."
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                />
                            ) : (
                                <Input 
                                    className="mt-1"
                                    placeholder={noteType === 'IMAGE' ? "https://example.com/image.jpg" : "https://youtube.com/..."}
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                />
                            )}
                             {noteType !== 'TEXT' && <p className="text-xs text-slate-400 mt-1">Simulate upload by providing a URL.</p>}
                        </div>

                        <Button type="submit" className="w-full">Add Note</Button> */}
                        {noteType === NoteType.TEXT ? (
                                <textarea 
                                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm min-h-[150px] mt-1"
                                    placeholder="# Note Title..."
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                />
                            ) : noteType === NoteType.VIDEO ? (
                                <Input 
                                    className="mt-1"
                                    placeholder="https://youtube.com/..."
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                />
                            ) : (
                                // FILE INPUT FOR PDF AND IMAGE
                                <div className="mt-1 flex items-center gap-2">
                                    <Input 
                                        id="file-upload"
                                        type="file"
                                        accept={noteType === NoteType.PDF ? ".pdf" : "image/*"}
                                        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                </div>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Uploading...' : 'Add Note'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
};
