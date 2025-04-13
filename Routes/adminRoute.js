const admin=require("../Models/Admin")
const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
app.use(express.json())
app.post("/register",async(req,res)=>{
    try {
        const {email,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const admin1=new admin({
            email,
            password:hashedPassword
        })
        await admin1.save()
        res.status(201).json({message:"Admin registered successfully"})
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
app.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const adminData=await admin.findOne({email})
        if(!adminData) return res.status(404).json({message:"Admin not found"})
        const isMatch=await bcrypt.compare(password,adminData.password)
        if(!isMatch) return res.status(401).json({message:"Invalid credentials"})
        const token=jwt.sign({id:adminData._id},"my-key",{expiresIn:"1h"})
        res.status(200).json({message:"Login successful",token})
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
module.exports=app