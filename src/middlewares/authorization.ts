import { NextFunction, Response } from "express"
import { AuthenticatedRequest } from "./auth"
import { Roles } from '../enum/Roles'
// if the user is Admin or not 
export const checkUserPrivelage = (type: string) =>
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        if (type == 'admin') {
            const haveAccess = user?.role == Roles.SUPER_ADMIN;
            if (!haveAccess)
                return res.status(400).send({ message_en: "Only The Super Admin Can Add Admin " })
        }
        else if (type == 'user') {
            const haveAccess = user?.role == Roles.ADMIN
            if (!haveAccess)
                return res.status(400).send({ message_en: 'Only The Admin Can Add Users' })

        }
        else if (type == 'changeRole') {
            const haveAccess=user?.role==Roles.SUPER_ADMIN;
            if(!haveAccess)
            return res.status(400).send({message:'ONLy Super Admin Can Change user Role'})
        }
        else if (type == 'product') {
            const haveAccess = user?.role == Roles.ADMIN;
            if (!haveAccess)
                return res.status(400).send({ message: "ONly The Admin Can Access The Products" })
        }
        else if (type=="page" || type=="section" || type=="subSection"){
            const haveAccess=user?.role==Roles.ADMIN;
            if(!haveAccess)
                return res.status(400).send({message_en:'Only Super Admin Can Add Content To The Site'})
        }
        next()

    }