import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";
import { AppError, invalidCredentials } from "../utils/appError.js";
import { adminValidation } from "../validations/admin.js"
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

export const loginAdmin = async (req:Request, res:Response) => {

   const validated = adminValidation.safeParse(req.body);

   if (!validated.success) {
       throw new invalidCredentials("Invalid input data");
   }

   try {
    const { username, password }: { username: string; password: string } = validated.data;

    const {data:admins, error} = await supabase.from('admins').select('*').eq('username', username).single();


 console.log("1. DB Search Result:", admins);
    console.log("2. DB Error:", error);


    if(error || !admins){
        throw new invalidCredentials("Invalid username or password");
    }
 console.log("3. Input Password:", password);
    console.log("4. Stored Hash:", admins.password);


    const isValidPass = await bcrypt.compare(password, admins.password)
    if(!isValidPass){
        throw new invalidCredentials("Invalid username or password");
    }
//jwt token goes here 

const token = jwt.sign({ id: admins.id, username: admins.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' }
);

    return res.status(200).json({
        status: "success",
        message: "Login successful",
        token
    });


   } catch (error) {
    res.status(400).json({
        status: "error",
        message: (error as AppError).message || "Login failed"
    });
   }
}