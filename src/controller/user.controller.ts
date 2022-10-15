import  {Request,Response,NextFunction } from 'express'
import User from '../model/user.model'
import bcrypt from 'bcryptjs'
import {hashPassword} from '../helper/hashPassword'

//DESC : add user 
//Route : POST /profile/api/v1/user
export const createUser=async(req:Request,res:Response,next:NextFunction)=>{
    const {email}=req.body
    // check if user exist or not 
    const user=await User.findOne({email})
    
    if(user)
        return res.status(400).send({success:false,message_en:'user is Already Registered'})
    // create user
    
    const newUser=new User({...req.body})
    newUser.password=hashPassword(newUser.password)
    await newUser.save();
    res.status(200).send({success:true,message_en:'User Created Successfully',user:newUser})
}

//DESC : update user 
//Route : PUT /profile/api/v1/user

export const updateUser=async(req:Request,res:Response)=>{
    
}