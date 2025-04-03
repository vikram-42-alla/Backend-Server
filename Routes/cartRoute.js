const express=require("express")
const app=express()
const Cart=require("../Models/Cart")
app.use(express.json())
app.post("/add", async (req, res) => {
    try {
      

        const { id, quantity } = req.body;


        const existingCartItem = await Cart.findOne({ id });

        if (existingCartItem) {
            const updatedCartItem = await Cart.findOneAndUpdate(
                { id },
                { $inc: { quantity: 1 } },
                { new: true }
            );

            return res.status(200).json({ message: "Quantity updated", cart: updatedCartItem });
        }

        const cart = new Cart(req.body);
        await cart.save();

        res.status(201).json({ message: "Added to cart", cart });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


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