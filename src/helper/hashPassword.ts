import {IUser} from '../model/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
export function hashPassword(password:string){
    // console.log(bcrypt.hashSync(password,10))
    return bcrypt.hashSync(password,10)
}

export  function  generateToken(id:mongoose.Schema.Types.ObjectId){
    return  jwt.sign({id},process.env.SECRET!)
}