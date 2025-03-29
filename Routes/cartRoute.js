const express=require("express")
const app=express()
const Cart=require("../Models/Cart")
app.use(express.json())
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
module.exports=app