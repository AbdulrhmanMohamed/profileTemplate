import { Request, Response, NextFunction } from 'express'
import User from '../../model/user.model'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../helper/hashPassword'
//DESC : user Login 
// Route :POST /profile/api/v1/user/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    // check if user found 
    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).send({ success: false, message_en: "Invalid Email For User" })
    // check if password matched or not 
    const passwordMatched = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordMatched)
        return res.status(400).send({ success: false, message_en: 'Invalid Password For User' })
    res.status(200).send({
        success: true, message_en: 'User Loged in Successfully', userInfo: {
            user,
            token: generateToken(user._id),

        }
    })
}