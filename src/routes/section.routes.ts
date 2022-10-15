import { Request,Response,NextFunction, Router } from "express";
import {addSection,deleteSection,getSection,getAllSections} from '../controller/section.controller'

const router:Router=Router();

router.route('/')
.get(getAllThePages)
.post(addPage)
router.route('/:id')
.get(getPage)
.put(updatePage)
.delete(deletePage)

export default router;