import Joi from 'joi';
import mongoose ,{Schema} from 'mongoose'

export interface ISubSection{
    title:string,
    description:string,
    
    keywords:[string],
    keywordDescription:string,
    
    image:string,
    isActive:boolean,
    
    
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
    
    image:{
        type:String,
        default:'https://via.placeholder.com/150',

    },
    isActive:{
        type:Boolean,
        default:false,
    },
   
})

const SubSection=mongoose.model<ISubSection>('SubSection',subSectionSchema)
export default SubSection;

export const subSectionValidation=async(subSection:ISubSection)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        keywords:Joi.array().items(Joi.string().required()).required,
        keywordDescription:Joi.string().required,
        image:Joi.string(),
    })
    return schema.validate(subSection)
}