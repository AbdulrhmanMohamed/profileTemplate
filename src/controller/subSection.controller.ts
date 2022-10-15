import {Request,Response} from 'express'
import SubSection from '../model/subSection.model'

// DESC add subSection 
// Route : POST /profile/api/v1/subSection
export const addsubSection=async(req:Request,res:Response)=>{
    // cehck if subSection exist or not 
        const subSection=await SubSection.findOne({title:req.body.title})
        if(!subSection)
            return res.status(400).send({success:false,message_en:'subSection Not Found'})
        const newSubSection=new SubSection({...req.body})
        res.status(200).send({success:true,messag_en:'subSection Fetched Successfully',subSection:newSubSection})
    
}

//DESC get subSection by id
//Route GET /profile/api/v1/subSection/:id
export const getsubSection=async(req:Request,res:Response)=>{
    const id=req.params.id;
    const subsection=await SubSection.findById(id)
    if(!subsection)
        return res.status(400).send({success:false,message_en:'subSection Not Found'})
    res.status(200).send({success:true,messag_en:'subSection Fetched Successfully',subsection})
}

//DESC get All SubSections
//Route GET /profile/api/v1/subSection
export const getAllSubSections=async(req:Request,res:Response)=>{
    const Subsections=await SubSection.find({})
    if(Subsections.length ==0)
        return res.status(400).send({success:false,message_en:'SubSections Not Found'})
    res.status(200).send({success:true,messag_en:'subSections Fetched Successfully',Subsections:{count:Subsections.length,Subsections}})
}

//DESC updatesubSection
//Route PUT /profile/api/v1/subSection/:id

export const updatesubSection=async(req:Request,res:Response)=>{
    const id=req.params.id;
    const subsection=await SubSection.findByIdAndUpdate(id,{...req.body},{new:true})
    if(!subsection)
        return res.status(400).send({success:false,message_en:'subSection not Found'})
    res.status(200).send({success:true,message_en:'subSection Updated Successfully',subsection})
}

export const deletesubSection=async(req:Request,res:Response)=>{
    const id=req.params.id;
    const subsection=await SubSection.findByIdAndDelete(id)
    if(!subsection)
        return res.status(400).send({success:false,message_en:'subSection Cant be updated because its not found'})
    res.status(200).send({success:true , message_en:'subSection Deleted Successfully'})
}