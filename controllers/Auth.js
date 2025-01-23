const bcrypt =require('bcrypt');
const User= require('../models/User');
const { default: mongoose } = require('mongoose');
const jwt =require("jsonwebtoken");
const validator = require('email-validator');
require("dotenv").config()
// signup
exports.signup = async(req, res)=>{
   const {username,email,password,role}=req.body;
   const nameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if(!username|| !email || !password || !role){
      return res.status(400).json({
         success:false,
         message:'empty input field'
      })
     }else  if (!nameRegex.test(username)) {
      return res.status(400).send('Invalid name format.');
    }else if (!emailRegex.test(email)) {
      return res.status(400).send('Invalid email format.');
    }


    const isValid = validator.validate(email);

    if (!isValid) {
      return res.status(400).json({ error: 'Email is not valid' });
    }

     try{
        

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message : 'User already exists',
            });
     }

     
     // secure password
     let hashedPassword;
     try{
       hashedPassword = await bcrypt.hash(password,10); 
     }
     catch(err){
        return res.status(500).json({
            sucess:false,
            message:'error in hashing password'
        })
     }

     // create entry for user

     const user =await User.create({
        username,email,password:hashedPassword,role
     })

     return res.status(200).json({
        sucess:true,
        message:'user created sucessfully'

     })
    }
     catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be register please try again later"
        })
     }
}

// login

exports.login = async(req,res)=>{
try {
   // fetch data
const {password,email}=req.body;
if(!email|| !password){
   return res.status(400).json({
      success:false,
      message:'empty input field'
   })
  }

  let user=await User.findOne({email});

  if(!user){
   return res.status(401).json({
      success:false,
      message:"User is not registered "
   })
  }

  // verify password and genrate JWt token

  // Bcrypt library ka compare function so that we can compare password
const payload ={
   username: user.username, 
   email:user.email,
   id:user._id,
   role:user.role,
}
  if(await bcrypt.compare(password,user.password)){
   // password matched
   let token = jwt.sign(payload,
      process.env.JWT_SECRET,
      {
         expiresIn:"2h",
      });

      user=user.toObject();
      user.password=undefined;
      user.token=token;
   

      // name ,data,options cookies parameters 29min

      const options={
         expires : new Date(Date.now()+ 24*60*60*1000*3 ), // Token expires in 3 days
         httpOnly:true // cokkie is not accessible via Javascript
      }

      return res.cookie("token",token, options).status(200).json({
         success:true,
         token,
         user,
         message:" user logged in successfully"
      })


  }else{
   return res.status(402).json({
      success:false,
      message:"Password Incorrect",
   })
  }
} catch (error) {
   console.log(error);
   console.error(error);

   return res.status(500).json({
      success: false,
      message:'Login Failure',
   })
}
}
