import { Router } from "express";
import {
    addsubSection,
    getsubSection,
    updatesubSection,
    deletesubSection,
    relateSubSection,
    updateSubSectionState
} from "../controller/subSection/subSection.controller";

const router: Router = Router();

router.route('/').post(addsubSection)
router.route('/updateSubSectionState/:id').put(updateSubSectionState)
router.route('/:sectionId/:subSectionId').put(relateSubSection)

export default router;