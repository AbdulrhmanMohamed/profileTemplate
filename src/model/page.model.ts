import Joi from 'joi';
import mongoose , {Schema} from 'mongoose'

export interface IPage{
    title:string,
    description:string,
    keywords:[string],
    keywordDescription:string,
    sections:[mongoose.Schema.Types.ObjectId],
    image:string,
    isActive:boolean,
    default:boolean,
    _id:String
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
        {type:mongoose.Schema.Types.ObjectId,ref:'Section'}
    ],
    image:{
        type:String,
        default:'https://via.placeholder.com/150',

    },
    isActive:{
        type:Boolean,
        default:false,
    },
    default:{
        type:Boolean,
        default:false
    }
})

const Page=mongoose.model<IPage>('Page',pageSchema)
export default Page;

// export const userValidation = (user: IUser) => {
//     const schema = Joi.object({
//         fullName_ar: Joi.string(),
//         fullName_en: Joi.string().required(),
//         userName_ar: Joi.string(),
//         userName_en: Joi.string().required(),
//         email: Joi.string().regex(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/).required(),
//         password: Joi.string().required(),
//         role: Joi.string().required()
//     })
//     return schema.validate(user)
// }
export const pageValidation=(page:IPage)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        keywords:Joi.array().items(Joi.string().required()).required(),
        keywordDescription:Joi.string().required(),
        sections:Joi.array().items(Joi.objectId()),
        image:Joi.string(),
        isActive:Joi.boolean().required(),
        default:Joi.boolean
    })
    return schema.validate(page)
}