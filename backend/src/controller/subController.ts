import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient.js';
import { AppError } from '../utils/appError.js';


export const getAllSubs = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const {data, error} = await supabase.from('subjects').select('* , semesters(name)').order('id', { ascending: false });

        if(error){
            throw new  AppError(error.message, 500);
        }
       res.json({
        status: 'success',
        data:data
       })
    
    } catch (error) {
        next(error);
    }

}

export const createSub = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {name, semester_id} = req.body;
        const {data, error} = await supabase.from('subjects').insert([{name,  semester_id}]).select();
         if(error) {
         throw new AppError(error.message, 500);
        }
        res.status(201).json({status: "success", data: data});
    } catch (error) {
        next(error);
    }
}

export const getSubBySemester = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {semesterId} = req.body;
        const {data, error }= await supabase.from('subjects').select('*').eq('semester_id', semesterId);
        if(error) {
            throw new AppError(error.message, 500);
        }
        res.json({status: "success", data: data});
    } catch (error) {
        next(error)
    }
}