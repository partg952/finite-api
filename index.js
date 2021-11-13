const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 9000
const Stocks = require("./mongoose");
const Users = require("./user");
const cors = require("cors");
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    Stocks.find().then(result=>{
        res.send(result);
    })
})

app.get('/search/:code',(req,res)=>{
Stocks.findOne({"code_name":req.params.code}).then(response=>{
res.send(response);
})
})

app.get('/add-user',(req,res)=>{
    const name = req.query.name;
    const email = req.query.email;
    const number = req.query.phone;
    const amount = req.query.amount;
    const data = new Users({
        name:name,
        email:email,
        phone:number,
        amount:amount
    })

    data.save().then(response=>{
        res.send(response)
    }).catch(err=>{
        res.send("something went wrong!!"+err);
    })

})

app.get('/users',(req,res)=>{
    Users.find().then(response=>{
        res.send(response)
    }).catch(err=>{
        res.send("something went wrong!!"+err);
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
