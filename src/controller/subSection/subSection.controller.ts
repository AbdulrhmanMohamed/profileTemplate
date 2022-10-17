import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../../middlewares/auth'
import Page from '../../model/page.model'
import Section, { ISection } from '../../model/section.model'
import SubSection from '../../model/subSection.model'

// DESC add subSection 
// Route : POST /profile/api/v1/subSection
export const addsubSection = async (req: Request, res: Response) => {
    // cehck if subSection exist or not 
    const subSection = await SubSection.findOne({ ...req.body })
    if (subSection)
        return res.status(400).send({ success: false, message_en: 'SubSection Already Exist' })
    const newSubSection = new SubSection({ ...req.body })
    await newSubSection.save();
    res.status(200).send({ success: true, messag_en: 'subSection Fetched Successfully', subSection: newSubSection })

}
export const relateSubSection = async (req: AuthenticatedRequest, res: Response) => {
    const { sectionId, subSectionId } = req.params;
    const section = await Section.updateOne({ _id: sectionId }, {
        $push: { subSections: subSectionId }
    })
    if (!section) {
        return res.status(400).send({ success: false, message_en: 'Section is Not Found' })
    }
    res.status(200).send({ success: true, message_en: 'Subsection Refrenced to Section Successfully' })
}

export const addSubSectionToSpecificSection = async (req: Request, res: Response) => {
    const id = req.params.id;
    const subSection = new SubSection({ ...req.body })
    await subSection.save();
    const section = await Section.updateOne({ _id: id }, { $push: { subSections: id }, new: true })
    if (!section)
        return res.status(400).send({ success: false, message_en: 'No Section found To add Your SubSection in ' })
    res.status(200).send({ success: true, message_en: 'SubSection ADDED Successfully to Speicific Section' })


}

//DESC get subSection by id
//Route GET /profile/api/v1/subSection/:id
export const getsubSection = async (req: Request, res: Response) => {
    const id = req.params.id;
    const subsection = await SubSection.findById(id)
    if (!subsection)
        return res.status(400).send({ success: false, message_en: 'subSection Not Found' })
    res.status(200).send({ success: true, messag_en: 'subSection Fetched Successfully', subsection })
}

//DESC get All SubSections
//Route GET /profile/api/v1/subSection
export const getAllSubSections = async (req: Request, res: Response) => {
    const Subsections = await SubSection.find({})
    if (Subsections.length == 0)
        return res.status(400).send({ success: false, message_en: 'SubSections Not Found' })
    res.status(200).send({ success: true, messag_en: 'subSections Fetched Successfully', Subsections: { count: Subsections.length, Subsections } })
}

//DESC updatesubSection
//Route PUT /profile/api/v1/subSection/:id

export const updatesubSection = async (req: Request, res: Response) => {
    const id = req.params.id;
    const subsection = await SubSection.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!subsection)
        return res.status(400).send({ success: false, message_en: 'subSection not Found' })
    res.status(200).send({ success: true, message_en: 'subSection Updated Successfully', subsection })
}

export const updateSubSectionState = async (req: AuthenticatedRequest, res: Response) => {
    console.log(req.params.id)
    const subSection = await SubSection.updateOne({ _id: req.params.id }, {
        $set: { isActive: true }
    })
    if (!subSection) {
        return res.status(400).send({ success: false, message_en: 'Cant update section State , subSection not Found' })
    }
    res.status(200).send({ success: true, message_en: 'updates subSection State Successfully' })
}
export const deletesubSection = async (req: Request, res: Response) => {


    //check where is the subSection inside the section array
    const subSections = await Section.find({
        subSections: { $elemMatch: { $eq: req.params.id } }
    })
    subSections.length && subSections.map(async (section: ISection) => {
        await Section.updateMany({ _id: section._id }, { $pull: { subSections: req.params.id } })
    })
    res.status(200).send({ success: true, message_en: 'subSection Deleted Successfully' })
}