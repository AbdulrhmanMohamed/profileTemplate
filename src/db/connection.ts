import mongoose from "mongoose";
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true )
export const dbConnection = () => {
    console.log(process.env.MONGO_URL)
 mongoose
    .connect(process.env.MONGO_URL!)
const db=mongoose.connection;
db.on('open',()=>console.log('connection staplished'.blue))
db.on('error',(e)=>console.log(`connection error: ${e}`.red))
   
};
