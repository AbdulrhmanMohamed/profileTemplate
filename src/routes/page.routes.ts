import { Request, Response, NextFunction, Router } from "express";
import {
     addPage, getPage, updatePageContent,
      deletePage, getAllThePages, updatePageState,
      
       udpateDefaultPage
    } from '../controller/page/page.controller'
import { AuthenticationMiddleWare } from "../middlewares/auth";
import { validator } from "../middlewares/validate";
import { pageValidation } from "../model/page.model";

const router: Router = Router();

 router.route('/').all(AuthenticationMiddleWare).post(validator(pageValidation,'post'),addPage)
    
 router.route('/:id')
 .get(getPage)
 .put(updatePageContent)
 .delete(deletePage)
 router.route('/:pageId/:sectionId')
 router.route('/state/:id').put(updatePageState)
 
 
 router.route('/changeDefault/:id').put(udpateDefaultPage)
export default router;