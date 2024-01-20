const mongoose=require('mongoose');
const dotenv=require("dotenv");
dotenv.config();


const dbConnect=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("connected to MongoDb")
        
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
module.exports=dbConnect