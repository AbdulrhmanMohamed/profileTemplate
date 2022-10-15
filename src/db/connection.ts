import mongoose from "mongoose";

export const dbConnection = () => {
    console.log(process.env.MONGO_URL)
 mongoose
    .connect(process.env.MONGO_URL!)
const db=mongoose.connection;
db.on('open',()=>console.log('connection staplished'.blue))
db.on('error',(e)=>console.log(`connection error: ${e}`.red))
   
};
