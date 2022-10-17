import { Request, Response, NextFunction, Router } from "express";
import { addSectionToSpecificPage, relateSection, updateSectionState } from "../controller/section/section.controller";

import { addSection, deleteSection, getSection, getAllSections, updateSection } from '../controller/section/section.controller'
import { validator } from "../middlewares/validate";
import { sectionValidation } from "../model/section.model";

const router: Router = Router();

router.route('/')
    .get(getAllSections)
    .post(validator(sectionValidation, 'post'), addSection)
router.route('/:id')
    .get(getSection)
    .put(updateSection)
    .delete(deleteSection)
router.route('/:pageId').post(addSectionToSpecificPage)
router.route('/updateSectionState/:id').put(updateSectionState)
router.route('/:pageId/:sectionId').put(relateSection)

export default router;