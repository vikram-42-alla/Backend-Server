const Product=require("../Models/Product")
const express=require("express")
const app=express()
const Cart=require("../Models/Cart")
app.use(express.json())
app.post("/add", async (req, res) => {
    try {
        const { id, title, price, offerPrice, discountPercentage, description, category, image, reviews } = req.body;
        // Check if the product already exists in the database
        const existpd=await Product.findOne({ id });
        if (existpd) {
            return res.status(400).json({ message: "Product already exists" });
        } 
        const product=new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product added successfully" });
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