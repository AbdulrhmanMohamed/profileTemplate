import Joi from 'joi';
import mongoose , {Schema} from 'mongoose'

export interface ISection{
    title:string,
    description:string,
    keywords:[string],
    keywordDescription:string,
    subSections:[mongoose.Schema.Types.ObjectId],
    image:string,
    isActive:boolean,
    _id:String,
   
}

const sectionSchema=new Schema<ISection>({
    title:{
        type:String,
        required:true,
        unique:true,
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
    subSections:[
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
    
})

const Section=mongoose.model<ISection>('Section',sectionSchema)
export default Section;


export const sectionValidation=async(section:ISection)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        keywords:Joi.array().items(Joi.string().required()).required,
        keywordDescription:Joi.string().required,
        subSections:Joi.array().items(Joi.objectId()),
        image:Joi.string(),
        isActive:Joi.boolean().required(),
        
    })
    return schema.validate(section)
}