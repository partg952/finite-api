const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 9000
const Stocks = require("./mongoose");
const Users = require("./user");
const cors = require("cors");
const nodemailer = require("nodemailer")
const Count = require("./count");
app.use(cors())
app.use(express.json())


const transport = nodemailer.createTransport({
    service:'gmail',
    port: 3003,
    auth:{
        user:"dankparth@gmail.com",
        pass:'leokudionnxeouea'
    }
});


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

app.post('/add-user',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.phone;
    const amount = req.body.amount;
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

    console.log(email);
    
    const mailOptions = {
        from:'dankparth@gmail.com',
        to:email+"@gmail.com",
        subject:'Best Stock options',
        html:`<img src='https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png'/>
              <p>Tesla</p>
              <p>hooray it's working!!</p>
        `
    };

    transport.sendMail(mailOptions).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err);
    })

})

app.get('/users',(req,res)=>{
    Users.find().then(response=>{
        res.send(response)
    }).catch(err=>{ 
        res.send("something went wrong!!"+err);
    })
})

app.get("/increase-count",(req,res)=>{
    Count.find().then(response=>{
        Count.findOneAndReplace({"count":response},{"count":parseInt(response)+1}).then(result=>{
            res.send("updated");
        }).catch(err=>{
            res.send(err);
        })
    }).catch(err=>{
        res.send(err);
    })
})
app.get("/get-count",(req,res)=>{
    Count.find().then(count=>{
        res.send(count);
    }).catch(err=>{
        res.send(err)
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
