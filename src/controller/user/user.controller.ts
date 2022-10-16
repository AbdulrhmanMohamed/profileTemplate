import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../../middlewares/auth'
import User from '../../model/user.model'
import bcrypt from 'bcryptjs'
import { hashPassword } from '../../helper/hashPassword'

export const changeUserRole = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    const user = await User.updateOne({ _id: id }, {
        $set: { role: req.body.role }, new: true,
    })
    if (!user)
        return res.status(400).send({ success: false, message_en: 'User Not Found' })
    res.status(200).send({ success: true, message: 'User Role Updated Successfully' })
}
//DESC : add user 
//Route : POST /profile/api/v1/user
export const createUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { email } = req.body
    // check if user exist or not 
    const user = await User.findOne({ email })

    if (user)
        return res.status(400).send({ success: false, message_en: 'user is Already Registered' })
    // create user

    const newUser = new User({ ...req.body })
    newUser.password = hashPassword(newUser.password)
    await newUser.save();
    res.status(200).send({ success: true, message_en: 'User Created Successfully', user: newUser })
}

//DESC : update user 
//Route : PUT /profile/api/v1/user

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
    console.log('from update : ', req.user)

}

export const changeRole=async(req:AuthenticatedRequest,res:Response)=>{
    const id=req.params.id;
    const user=await User.updateOne({_id:id},{$set:{role:'admin'}})
    if(!user)
        return res.status(400).send({success:false,message_en:`Can't update user beCause it's not found`})
        console.log(user)
    res.status(200).send({success:true,message_en:'user Role Change To Admin Successfully'})
}