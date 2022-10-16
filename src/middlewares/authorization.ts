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
            const haveAccess = user?.role == Roles.ADMIN || user?.role == Roles.SUPER_ADMIN;
            if (!haveAccess)
                return res.status(400).send({ message_en: 'Normal User Dont have access' })

        }
        else if (type == 'product') {
            const haveAccess = user?.role == Roles.ADMIN;
            if (!haveAccess)
                return res.status(400).send({ message: "ONly The Admin Can Access The Products" })
        }
        else if (type == 'changeRole') {

        }
        next()

    }