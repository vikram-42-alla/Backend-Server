const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
    title:String,
    category:String,
    description:String,
    image:String,
    price:Number,
    discount:String,
    offerPrice:String,
    reviews:String

})
const Model=mongoose.model("Cart",cartSchema)
module.exports=Model