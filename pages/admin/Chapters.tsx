import React, { useEffect, useState } from 'react';
import { db } from '../../lib/db';
import { Semester, Subject, Chapter } from '../../types';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Card, CardHeader, CardTitle, CardContent, Label } from '../../components/ui/shadcn';
import { Trash2, Plus } from 'lucide-react';

export const AdminChapters: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  
  const [selectedSemId, setSelectedSemId] = useState('');
  const [selectedSubId, setSelectedSubId] = useState('');
  const [newChapterName, setNewChapterName] = useState('');
  const [loading, setLoading] = useState(false);

  // Load Semesters initially
  useEffect(() => {
    const loadSemesters = async () => {
        const sems = await db.semesters.getAll();
        setSemesters(sems);
        if (sems.length > 0) setSelectedSemId(sems[0].id);
    };
    loadSemesters();
  }, []);

  // Load Subjects when Semester changes
  useEffect(() => {
    if (!selectedSemId) return;
    const loadSubjects = async () => {
        const subs = await db.subjects.getBySemester(selectedSemId);
        setSubjects(subs);
        if (subs.length > 0) {
            setSelectedSubId(subs[0].id);
        } else {
            setSelectedSubId('');
            setChapters([]);
        }
    };
    loadSubjects();
  }, [selectedSemId]);

  // Load Chapters when Subject changes
  useEffect(() => {
    if (!selectedSubId) return;
    fetchChapters();
  }, [selectedSubId]);

  const fetchChapters = async () => {
    setLoading(true);
    const data = await db.chapters.getBySubject(selectedSubId);
    setChapters(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterName || !selectedSubId) return;
    await db.chapters.create({ name: newChapterName, subjectId: selectedSubId });
    setNewChapterName('');
    fetchChapters();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this chapter?')) {
      await db.chapters.delete(id);
      fetchChapters();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Chapters</h1>

      <Card>
          <CardHeader>
              <CardTitle>Manage Chapters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 <div>
                    <Label>Select Semester</Label>
                    <select 
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm mt-1"
                        value={selectedSemId}
                        onChange={(e) => setSelectedSemId(e.target.value)}
                    >
                        {semesters.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <Label>Select Subject</Label>
                    <select 
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm mt-1"
                        value={selectedSubId}
                        onChange={(e) => setSelectedSubId(e.target.value)}
                        disabled={!subjects.length}
                    >
                        {subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedSubId ? (
                <div className="space-y-4">
                     <form onSubmit={handleCreate} className="flex gap-2">
                        <Input 
                            placeholder="New Chapter Name" 
                            value={newChapterName}
                            onChange={(e) => setNewChapterName(e.target.value)}
                        />
                        <Button type="submit" disabled={loading}>
                            <Plus className="mr-2 h-4 w-4" /> Add
                        </Button>
                    </form>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Chapter Name</TableHead>
                                <TableHead>Notes Count</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chapters.map((chap) => (
                                <TableRow key={chap.id}>
                                    <TableCell className="font-medium">{chap.name}</TableCell>
                                    <TableCell>{chap.notes?.length || 0}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(chap.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                             {chapters.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-slate-500">No chapters in this subject.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center p-4 text-slate-500">Select a subject to manage chapters.</div>
            )}
          </CardContent>
      </Card>
    </div>
  );
};
