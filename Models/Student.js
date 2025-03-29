const mongoose=require("mongoose")
const studentSchema=new mongoose.Schema({
    name:String,
    fatherName:String,
    DOB:String,
    branch:String,
    rollNo:String,
    section:String,
    address:String,
    email:String,
    mobileNo:String,
    password:String
})
const model=mongoose.model("Student",studentSchema)
module.exports=model