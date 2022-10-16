import express from 'express'
import dotenv from 'dotenv'
import 'colors'
import path from 'path'
import {Request,Response,NextFunction } from 'express'
import {dbConnection} from './db/connection'
import morgan from 'morgan'
import cors from 'cors'
import userRoute from './routes/user.routes'
import pageRoutes from './routes/page.routes'
import sectionRoutes from './routes/section.routes'
import subSectionRoutes from './routes/subSection.routes'
import Joi from 'joi'
Joi.objectId = require('joi-objectid')(Joi);
dotenv.config({path:path.resolve(__dirname,'config/dev/config.env')})
const app=express();

// adding middle wares 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const port=process.env.PORT ;
console.log("port is ",port)

// using routes 
app.use('/profile/api/v1/user',userRoute)
app.use('/profile/api/v1/page',pageRoutes)
app.use('/profile/api/v1/section',sectionRoutes)
app.use('/profile/api/v1/subSection',subSectionRoutes)
.use('*',(req:Request,res:Response)=>{
    res.status(404).send({success:false,message_en:'Un Handled Route'})
})
app.listen(port ,()=>{
    dbConnection()
    console.log('listening Successfully'.green)
})
