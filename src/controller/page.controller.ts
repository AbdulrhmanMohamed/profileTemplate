import {Request,Response} from 'express'
import Page from '../model/page.model'

// DESC add page 
// Route : POST /profile/api/v1/page
export const addPage=async(req:Request,res:Response)=>{
    // cehck if page exist or not 
    const page =await Page.findOne({title:req.body.title})
    if(page)
        return res.status(400).send({success:false,message_en:'Title is Already Used Choose Another One '})
    const newPage=new Page({
        ...req.body
    })
    await newPage.save();
    res.status(200).send({success:true,message_en:'Page Created Successfully',page:newPage})
}

//DESC get page by id
//Route GET /profile/api/v1/page/:id
export const getAllThePages=async(req:Request,res:Response)=>{
    const pages=await Page.find();
    if(pages.length ==0)
        return res.status(400).send({success:false,message_en:'Pages are not found'})
    res.status(200).send({success:true,message_en:'Pages Are Fetched Successfully',pages:{count:pages.length,pages}})
}

//DESC get page by id
//Route GET /profile/api/v1/page/:id
export const getPage=async(req:Request,res:Response)=>{
    const id=req.params.id;
    const page=await Page.findById(id)
    if(!page)
        return res.status(400).send({success:false,message_en:'Page Not Found'})
    res.status(200).send({success:true,messag_en:'Page Fetched Successfully',page})
}

//DESC updatePage
//Route PUT /profile/api/v1/page/:id

export const updatePage=async(req:Request,res:Response)=>{
    const id=req.params.id;
    const page=await Page.findByIdAndUpdate(id,{...req.body},{new:true})
    if(!page)
        return res.status(400).send({success:false,message_en:'Page not Found'})
    res.status(200).send({success:true,message_en:'Page Updated Successfully',page})
}

export const deletePage=async(req:Request,res:Response)=>{
    const id=req.params.id;
    const page=await Page.findByIdAndDelete(id)
    if(!page)
        return res.status(400).send({success:false,message_en:'Page Cant be updated because its not found'})
    res.status(200).send({success:true , message_en:'Page Deleted Successfully'})
}