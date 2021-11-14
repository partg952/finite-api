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
        html:`
        <style>
        div#famous-stocks div img{
            height: 100px;
            width: 100px;
            }
            div#famous-stocks div{
              margin: 10px;
              align-items: center;
              text-align: center;
              height: 180px;
              width: 180px; 
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              padding: 10px;
              background-color: orange;
              border-radius: 6px;
              transition: all 200ms ease;
              cursor: pointer;
              border: 1px solid transparent;
            
            }
            div#famous-stocks div:hover{
              transform: scale(1.08);
              background-color: yellow;
              border: 1px solid black;
            }
            div#famous-stocks{
            margin: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            }
        </style>
              <body>
              <div id="famous-stocks">
      <div class="stocks" onclick="gotopage('AMD')">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/AMD_Logo.png" style="height: 30px; margin: 20px;" alt="">
        <h3>Advanced Micro Devices(AMD)</h3>
        <p>100% YTD Returns</p>
      </div>
      <div class="stocks" onclick="gotopage('NIO')">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Nio_2020_Logo.svg/1200px-Nio_2020_Logo.svg.png" style="height: 30px; margin: 20px;" alt="">
        <h3>Nio Limited(NIO)</h3>
        <p>1112% YTD Returns</p>
      </div> 
      <!-- Other Stocks are appended as child through the stocks data from stocks_data.js -->
    </div>
              </body>
              
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
    var data = new Count({
        count:req.query['num']
    })
    data.save().then(response=>{
        res.send(response)
    }).catch(err=>{
        res.send("something went wrong!!"+err);
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
