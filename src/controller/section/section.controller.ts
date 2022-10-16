import { Request, Response } from 'express'
import Section from '../../model/section.model'

// DESC add Section 
// Route : POST /profile/api/v1/Section
export const addSection = async (req: Request, res: Response) => {
    // cehck if Section exist or not 
    const section = await Section.findOne({ title: req.body.title })
    if (!section)
        return res.status(400).send({ success: false, message_en: 'Section Not Found' })
    const newSection = new Section({ ...req.body })
    res.status(200).send({ success: true, messag_en: 'Section Fetched Successfully', newSection })

}

//DESC get Section by id
//Route GET /profile/api/v1/Section/:id
export const getSection = async (req: Request, res: Response) => {
    const id = req.params.id;
    const section = await Section.findById(id)
    if (!section)
        return res.status(400).send({ success: false, message_en: 'Section Not Found' })
    res.status(200).send({ success: true, messag_en: 'Section Fetched Successfully', section })
}

//DESC get All Sections
//Route GET /profile/api/v1/section
export const getAllSections = async (req: Request, res: Response) => {
    const sections = await Section.find({})
    if (sections.length == 0)
        return res.status(400).send({ success: false, message_en: 'Sections Not Found' })
    res.status(200).send({ success: true, messag_en: 'Section Fetched Successfully', sections: { count: sections.length, sections } })
}

//DESC updateSection
//Route PUT /profile/api/v1/Section/:id

export const updateSection = async (req: Request, res: Response) => {
    const id = req.params.id;
    const section = await Section.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!section)
        return res.status(400).send({ success: false, message_en: 'Section not Found' })
    res.status(200).send({ success: true, message_en: 'Section Updated Successfully', section })
}

export const deleteSection = async (req: Request, res: Response) => {
    const id = req.params.id;
    const section = await Section.findByIdAndDelete(id)
    if (!section)
        return res.status(400).send({ success: false, message_en: 'Section Cant be updated because its not found' })
    res.status(200).send({ success: true, message_en: 'Section Deleted Successfully' })
}