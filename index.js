const Cart=require("./Models/Cart")
const dotenv=require("dotenv")
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
// const routes=require('./Routes/routes')
// app.use('/user',routes)

dotenv.config()
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected Successfully"))
.catch(error=>console.log(error.message))
app.listen(3000,()=>{
    console.log("Server running on port 3000");
    
})