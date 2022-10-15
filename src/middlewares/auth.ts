import {Request , Response ,NextFunction} from 'express'
 export const AuthinticationMiddleWare=async(req:Request,res:Response,next:NextFunction)=>{
    // check if the user provided a middle ware befor any request 
    const token=req.headers['authorization'];
    console.log(token)
}