const express=require("express")
const app=express()

const Student=require("../Models/Student")
app.use(express.json())



//Student API
app.post("/signup",async(req,res)=>{
    try {
        const{name,
            fatherName,
            DOB,
            branch,
            rollNo,
            section,
            address,
            mobileNo,
            password}=req.body
        const rollNumber=await Student.findOne({rollNo})
      
        if(rollNumber){
            return res.status(400).json({message:"User already Exists"})
        }
        const student=new Student(req.body)
        await student.save()
        res.status(201).json({message:"Registration completed"})
    } catch (error) {
        console.error(error)
    }
})
app.post("/signin",async(req,res)=>{
    try {
         const{rollNo,password}=req.body
        const studentLogin=await Student.findOne({rollNo,password})
        if(studentLogin){
            res.json(studentLogin)
        }
        else{
            res.status(400).json({message:"Invalid Username or password"})
        }
    } catch (error) {
        console.error(error);
        
    }
})
app.post("/details",async(req,res)=>{
    try {
        const{rollNo}=req.body
        const user=await Student.find({rollNo})
        if(!user){
            return res.status(400).json({error:"Error"})
        }
        res.json(user)
    } catch (error) {
        console.error(error);
        
    }
})
app.get("/get",async(req,res)=>{
    try {
        const user=await Student.find();
        if(!user)return res.status(404).json({message:"User not found"});
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
    }
})
module.exports=app
