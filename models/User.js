const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
username:{
type:String,
required:true,
trim:true,
unique:true,
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
role:{
    type:String,
    enum:["Admin","Consumer"],
    default: "Consumer", // Default role
}
})

module.exports = mongoose.model("User",userSchema); 