const Product=require("../Models/Product")
const express=require("express")
const app=express()
const Cart=require("../Models/Cart")
app.use(express.json())
app.post("/add", async (req, res) => {
    try {
        const product=new Product(req.body);
        await product.save();
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
})
app.get("/get",async(req,res)=>{
    try {
        const getProducts=await Product.find();
        if(!getProducts) return res.status(404).json({message:"Data not found"})
        res.status(201).json(getProducts) 
    } catch (error) {
        console.error(error);
        
    }
})
module.exports=app