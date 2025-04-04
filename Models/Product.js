
const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
    id:Number,
    title:String,
    price:Number,
    offerPrice:Number,
    discountPercentage:String,
    description:String,
    category:String,
    image:String,
    reviews:Object,
    quantity:Number

})
const Model=mongoose.model("Product",cartSchema)
module.exports=Model