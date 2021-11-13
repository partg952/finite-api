const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const count_schema = new Schema({
    count:{
        type:Number,
        required:true,
    }
})

const Count = mongoose.model("Count",count_schema);
module.exports = Count;