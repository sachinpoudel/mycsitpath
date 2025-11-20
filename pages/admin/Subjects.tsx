import React, { useEffect, useState } from 'react';
import { db } from '../../lib/db';
import { Semester, Subject } from '../../types';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Card, CardHeader, CardTitle, CardContent, Label } from '../../components/ui/shadcn';
import { Trash2, Plus } from 'lucide-react';
import { createSubjectApi } from '@/api/api';

export const AdminSubjects: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemId, setSelectedSemId] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
        const sems = await db.semesters.getAll();
        setSemesters(sems);
        if (sems.length > 0) setSelectedSemId(sems[0].id);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedSemId) {
        fetchSubjects();
    }
  }, [selectedSemId]);

  const fetchSubjects = async () => {
    setLoading(true);
    const data = await db.subjects.getBySemester(selectedSemId);
    setSubjects(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName || !selectedSemId) return;
   
    const res =await createSubjectApi({ name: newSubjectName, semester_id: selectedSemId });
    if(res.error){
      console.log(res.error);
    }
    console.log(res);
    setNewSubjectName('');
    fetchSubjects();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this subject?')) {
      await db.subjects.delete(id);
      fetchSubjects();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Manage Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div>
                    <Label>Select Semester</Label>
                    <select 
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                        value={selectedSemId}
                        onChange={(e) => setSelectedSemId(e.target.value)}
                    >
                        {semesters.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <form onSubmit={handleCreate} className="flex gap-2">
                    <Input 
                        placeholder="New Subject Name" 
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        <Plus className="mr-2 h-4 w-4" /> Add
                    </Button>
                </form>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject Name</TableHead>
                            <TableHead>Chapters Count</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.map((sub) => (
                            <TableRow key={sub.id}>
                                <TableCell className="font-medium">{sub.name}</TableCell>
                                <TableCell>{sub.chapters?.length || 0}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(sub.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {subjects.length === 0 && !loading && (
                            <TableRow>
                                <td colSpan={3} className="text-center text-slate-500">No subjects in this semester.</td>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
          </CardContent>
      </Card>
    </div>
  );
};
