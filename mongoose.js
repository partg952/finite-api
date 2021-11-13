const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbschema = new Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    increase:{
        type:String,
        required:true,
    },
    code_name:{
        type:String,
        required:true
    }

},{timestamps:true});

const Stocks = mongoose.model('Stocks',dbschema);
module.exports = Stocks;