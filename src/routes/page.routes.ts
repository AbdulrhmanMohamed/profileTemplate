import { Request, Response, NextFunction, Router } from "express";
import {
    addPage, getPage, updatePageContent,
    deletePage, getAllThePages, updatePageState,

    udpateDefaultPage
} from '../controller/page/page.controller'
import { AuthenticationMiddleWare } from "../middlewares/auth";
import { checkUserPrivelage } from "../middlewares/authorization";
import { validator } from "../middlewares/validate";
import { pageValidation } from "../model/page.model";

const router: Router = Router();

router.route('/').all(AuthenticationMiddleWare, checkUserPrivelage('page'))
    .get(getAllThePages)
    .post(validator(pageValidation, 'post'), addPage)

router.route('/:id').all(AuthenticationMiddleWare, checkUserPrivelage('page'))
    .get(getPage)
    .put(updatePageContent)
    .delete(deletePage)

router.route('/state/:id')
    .all(AuthenticationMiddleWare, checkUserPrivelage('page'))
    .put(updatePageState)


router.route('/changeDefault/:id')
    .all(AuthenticationMiddleWare, checkUserPrivelage('page'))
    .put(udpateDefaultPage)
export default router;