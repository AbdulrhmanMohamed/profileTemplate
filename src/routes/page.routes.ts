import { Request,Response,NextFunction, Router } from "express";
import {addPage,getPage,updatePage,deletePage, getAllThePages} from '../controller/page.controller'

const router:Router=Router();

router.route('/')
.get(getAllThePages)
.post(addPage)
router.route('/:id')
.get(getPage)
.put(updatePage)
.delete(deletePage)

export default router;