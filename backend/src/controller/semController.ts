import type {NextFunction, Request, Response} from 'express';
import { supabase } from '../supabaseClient.js';
import { AppError } from '../utils/appError.js';


export const getSem = async(res:Response, req:Request, next:NextFunction) => {
   try {
     const {data:semesters, error}  = await supabase.from('semesters').select('*').order('number', { ascending: true });

    if(error) {
     throw new AppError("Database error", 500);
    }
    res.json({status: "success", data: semesters});
   } catch (error) {
  next(error)
}
}
export const createSem = async(req:Request, res:Response, next:NextFunction) => {
try {
    const {name, number} = req.body;
    const {data, error} = await supabase.from('semesters').insert([{name, number}]).select();
     if(error) {
     throw new AppError("Database error", 500);
    }
    res.status(201).json({status: "success", data: data});
} catch (error) {
  next(error)
}
}

export const deleteSemester = async (req: Request, res: Response, next:NextFunction) => {
 try {
     const { id } = req.params;
  const { error } = await supabase.from('semesters').delete().eq('id', id);
  if (error) {
    throw new AppError("Database error", 500);  
  }
  res.json({ status: 'success', message: 'Deleted' });
 } catch (error) {
    next(error)
 }
};