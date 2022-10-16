import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import User, { IUser } from '../model/user.model';
import mongoose from 'mongoose';
export interface AuthenticatedRequest extends Request {
    user?: IUser,
}

export const AuthenticationMiddleWare = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers['authorization'];
    console.log(token)
    if (!token)
        return res.status(401).send({ success: false, message_en: 'Access Denied' })

    // console.log(decode)
    try {
        const decode: any = jwt.verify(token!, process.env.SECRET!)

        const user: IUser | any = await User.findById(decode.id);

        (req as AuthenticatedRequest).user = user
    } catch (e) {

        return res.status(400).send({ success: false, message_en: 'Invalid Token' })
    }


    next()

}