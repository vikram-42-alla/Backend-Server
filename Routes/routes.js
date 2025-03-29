const express=require("express")
const app=express()
const Cart=require("../Models/Cart")
const Student=require("../Models/Student")
app.use(express.json())
//Products API
app.post("/add",async(req,res)=>{
    try {
        const cart=new Cart(req.body)
        await cart.save()
        res.status(201).json({message:"Added to cart"})
    } catch (error) {
        console.error(error);
        
    }
})
app.get("/get",async(req,res)=>{
    try {
        const getProducts=await Cart.find();
        if(!getProducts) return res.status(404).json({message:"Data not found"})
        res.json(getProducts) 
    } catch (error) {
        console.error(error);
        
    }
})

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
        const student=await  Student.insertMany(req.body)
        
        res.status(201).json({message:"Registration completed"})
    } catch (error) {
        console.error(error)
    }
})
app.post("/signin",async(req,res)=>{
    try {
        const{ rollNo,password}=req.body
        const studentLogin=await Student.findOne({rollNo,password})
        if(studentLogin){
            res.status(200).json({message:"Login Successfully",studentData:studentLogin})
        }else{
            res.status(400).json({message:"Invalid Credentials"})
        }
    } catch (error) {
        console.error(error);
        
    }
})
module.exports=app