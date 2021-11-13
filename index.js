const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 9000
const Stocks = require("./mongoose");
const cors = require("cors");
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    Stocks.find().then(result=>{
        res.send(result);
    })
})





app.listen(PORT,()=>{
    console.log(`listening at ${PORT}`)
    mongoose.connect(`mongodb+srv://parth:hello@cluster0.zbwa7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(res=>{
        console.log("connected!!")
    }).catch(err=>{
        console.log(`something went wrong:${err}`)
    })
})