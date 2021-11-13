const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userschema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    }

},{timestamps:true});

const Users = mongoose.model('Users',userschema);
module.exports = Users;