import Joi from 'joi';
import mongoose , {Schema} from 'mongoose'

interface IPage{
    title:string,
    description:string,
    keywords:[string],
    keywordDescription:string,
    sections:[mongoose.Schema.Types.ObjectId],
    image:string,
    isActive:boolean
}

const pageSchema=new Schema<IPage>({
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
    sections:[
        {type:mongoose.Schema.Types.ObjectId,required:true,ref:'Section'}
    ],
    image:{
        type:String,
        default:'https://via.placeholder.com/150',

    },
    isActive:{
        type:Boolean,
        default:false,
    }
})

const Page=mongoose.model<IPage>('Page',pageSchema)
export default Page;


export const pageValidation=async(page:IPage)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        keywords:Joi.array().items(Joi.string().required()).required,
        keywordDescription:Joi.string().required,
        sections:Joi.array().items(Joi.objectId().required()),
        image:Joi.string(),
        isActive:Joi.boolean().required(),
    })
    return schema.validate(page)
}