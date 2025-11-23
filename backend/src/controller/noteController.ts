import  type { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient.js';
import { AppError } from '../utils/appError.js';

export const getNotesByChapterId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('chapter_id', id)
      .order('created_at', { ascending: false });

    if (error) throw new AppError(error.message, 400);
    res.status(200).json({ status: 'success', data });
  } catch (err) { next(err); }
};


// export const getNoteByChapter = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {chapter_id} = req.params;
//     const {data, error} = await supabase.from('notes').select('*').eq('chapter_id', chapter_id);
//     if(error) {
//       throw new AppError(error.message, 500);
//     }
//     return res.json({status: "success", data: data});
//   } catch (error) {
//     next(error)
//   }
// }



export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, url, type, chapter_id } = req.body;
    
    if (!chapter_id || !type) throw new AppError('Missing required fields', 400);

    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, url, type, chapter_id }])
      .select()
      .single();

    if (error) throw new AppError(error.message, 400);
    res.status(201).json({ status: 'success', data });
  } catch (err) { next(err); }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) throw new AppError(error.message, 400);
    res.status(200).json({ status: 'success', message: 'Deleted' });
  } catch (err) { next(err); }
};