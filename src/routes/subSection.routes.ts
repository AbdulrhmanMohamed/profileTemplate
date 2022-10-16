import { Router } from "express";
import { 
    addsubSection,
    getsubSection,
    updatesubSection,
    deletesubSection
 } from "../controller/subSection/subSection.controller";

const router:Router=Router();

router.route('/')
    
    .post( addsubSection)

export default router;