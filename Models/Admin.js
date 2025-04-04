const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({
    email:String,
    password:String, 
   
})
const Model=mongoose.model("Admin",adminSchema)
module.exports=Model