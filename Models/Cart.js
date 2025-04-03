
const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
    title:String,
    category:String,
    description:String,
    image:String,
    price:Number,
    discountPercentage:Number,
    offerPrice:Number,
    reviews:Number

})
const Model=mongoose.model("Cart",cartSchema)
module.exports=Model