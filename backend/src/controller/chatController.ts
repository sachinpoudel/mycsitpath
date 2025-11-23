import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient.js';
import { AppError } from '../utils/appError.js';

export const getChaptersBySubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
const {id} = req.params;

    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('subject_id', id)
      .order('number', { ascending: true });

    if (error) throw new AppError(error.message, 400);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

export const getChapterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const {id} = req.params;
   const {data, error} = await supabase.from('chapters').select('*').eq('id', id).single();
    if(error) {
      throw new AppError(error.message, 500);
    }
    return res.json({status: "success yes", data: data});
  } catch (error) {
    next(error)
  }
}


export const createChapter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, number, subject_id } = req.body;
    if (!name || !number || !subject_id) throw new AppError('Missing fields', 400);

    const { data, error } = await supabase
      .from('chapters')
      .insert([{ name, number, subject_id }])
      .select()
      .single();

    if (error) throw new AppError(error.message, 400);
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

export const deleteChapter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('chapters').delete().eq('id', id);
    if (error) throw new AppError(error.message, 400);
    res.status(200).json({ status: 'success', message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};