import Joi from 'joi';
import mongoose ,{Schema} from 'mongoose'

interface ISubSection{
    title:string,
    description:string,
    
    keywords:[string],
    keywordDescription:string,
    sections:[mongoose.Schema.Types.ObjectId],
    image:string,
    isActive:boolean,
    section:mongoose.Schema.Types.ObjectId,
    
}

const subSectionSchema=new Schema<ISubSection>({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
   
    keywords:[{
        type:String,
        required:true,
    }],
    keywordDescription:{type:String,required:true},
    sections:[
        {type:mongoose.Schema.Types.ObjectId,required:true,ref:'SubSection'}
    ],
    image:{
        type:String,
        default:'https://via.placeholder.com/150',

    },
    isActive:{
        type:Boolean,
        default:false,
    },
    section:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Section'
    }
})

const Section=mongoose.model<ISubSection>('Section',subSectionSchema)
export default Section;

export const subSectionValidation=async(subSection:ISubSection)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        keywords:Joi.array().items(Joi.string().required()).required,
        keywordDescription:Joi.string().required,
        sections:Joi.array().items(Joi.objectId().required()),
        image:Joi.string(),
    })
    return schema.validate(subSection)
}