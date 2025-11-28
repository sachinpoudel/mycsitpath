import React, { useEffect, useState } from 'react';
import { Semester } from '../../types';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Card, CardHeader, CardTitle, CardContent } from '../../components/ui/shadcn';
import { Trash2, Plus } from 'lucide-react';
import { createSemesterApi, deleteSemesterApi, getSemestersApi } from '@/api/api';

export const AdminSemesters: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [newSemName, setNewSemName] = useState('');
  const [newSemOrder, setNewSemOrder] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSemesters = async () => {
try {
  setLoading(true);
  const data = await getSemestersApi();
  setSemesters(data || []);
  console.log("Fetched semesters:", data);
} catch (error) {
  console.log("Error fetching semesters:", error);
}finally{
  setLoading(false);
}
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSemName) return;
    
    try {
      setLoading(true);
      await createSemesterApi({ name: newSemName, number: newSemOrder });
      
      setNewSemName('');
      setNewSemOrder(prev => prev + 1);
      fetchSemesters();
    } catch (error) {
      console.error("Failed to create semester", error);
      alert("Failed to create semester");
    } finally {
      setLoading(false);
    }
  };
 const handleDelete = async (id: string) => {
    if (window.confirm('Delete this semester?')) {
      try {
        // CHANGE: Use API instead of db.semesters.delete
        await deleteSemesterApi(id);
        fetchSemesters();
      } catch (error) {
        console.error("Failed to delete", error);
        alert("Failed to delete semester");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Semesters</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Semester</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-2">
                <Input 
                    placeholder="Semester Name (e.g., Semester 1)" 
                    value={newSemName}
                    onChange={(e) => setNewSemName(e.target.value)}
                />
                <Input 
                    type="number"
                    placeholder="Order"
                    value={newSemOrder}
                    onChange={(e) => setNewSemOrder(parseInt(e.target.value))}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <Plus className="mr-2 h-4 w-4" /> Create Semester
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
            <CardTitle>Existing Semesters</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {semesters.map((sem) => (
                        <TableRow key={sem.id}>
                            <TableCell>{sem.order}</TableCell>
                            <TableCell className="font-medium">{sem.name}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(sem.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {semesters.length === 0 && !loading && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-slate-500">No semesters found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
