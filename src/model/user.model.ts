import mongoose, {Schema } from 'mongoose'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Roles } from '../enum/Roles'
export interface IUser{
    fullName_ar:string,
    fullName_en:string,
    userName_ar:string,
    userName_en:string,
    email:string,
    password:string,
    // generateToken:()=>string,
    // hashPassword:(password:string)=>string
    role:Roles,

}
const userSchema=new Schema({
    fullName_ar:{
        type:String,
        required:true,
    },
    fullName_en:{
        type:String,
        required:true,
    },
    userName_ar:{
        type:String,
        required:true,
    },
    userName_en:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
       enum:[Roles.ADMIN,Roles.SUPER_ADMIN,Roles.USER],
       type:String,
       required:true
        
    }

})

const User=mongoose.model<IUser>('User',userSchema)

// method for generating token 
// userSchema.methods.generateToken=(userId:mongoose.Schema.Types.ObjectId)=>{
//   return jwt.sign({id:userId},process.env.SECRET!)
// }
// userSchema.methods.hashPassword=(password:string)=>
// {
//     console.log(password)
//     password=bcrypt.hashSync(password,10);
//     return password
// }
export default User;

export const userValidation=(user:IUser)=>{
    const schema=Joi.object({
        fullName_ar:Joi.string().required(),
        fullName_en:Joi.string().required(),
        userName_ar:Joi.string().required(),
        userName_en:Joi.string().required(),
        email:Joi.string().regex(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/).required(),
        password:Joi.string().required(),
        role:Joi.string().required()
    })
    return schema.validate(user)
}