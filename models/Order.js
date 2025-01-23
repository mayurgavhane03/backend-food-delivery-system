const mongoose = require('mongoose');

const orderSchema =new mongoose.Schema({
userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
},
items:[
    {
        menuItemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Menu",
        },
        quantity:{
            type:Number,
            required:true,
        },
       
    }
],
status:{
    type:String,
    default:"pending",
},
createdAt:{
    type:Date,
    default:Date.now()
},


})

module.exports = mongoose.model("Order",orderSchema); 