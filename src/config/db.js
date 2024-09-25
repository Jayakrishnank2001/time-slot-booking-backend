const mongoose=require('mongoose')
require('dotenv').config()

module.exports=async function connect(){
    try{
        const dbURI=process.env.MONGO_URI;
        await mongoose.connect(dbURI)
        console.log('connected to MongoDB')
    }catch(error){
        console.log('error in mongodb connecting',error)
    }
}