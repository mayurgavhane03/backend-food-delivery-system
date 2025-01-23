// auth 
const jwt =require('jsonwebtoken');

require("dotenv").config();

exports.auth=(req,res,next)=>{

    try {
        
        console.log("cookie",req.cookies.token); 
        console.log("body",req.body.token);
        // console.log("header",req.header("Authorization").replace("Bearer ",""))
        // extract jwt token

        // const token=req.header("Authorization").replace("Bearer ","")
        // const token = req.body.token || req.headers.authorization?.split(" ")[1] || req.cookies?.token;
        const token= req.cookies.token ; //;req.cookies.token ;
         console.log(token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            });
        }

        // verify the token 
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);

            req.user=decode;
        } catch (error) {
            return res.status(401).json({
                 success:false,
                 message:"token is Invalid",
            })
        }

        next();


    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"something went wrong while verifying the token"
        })
    }
}


// second middleware for better understanding

exports.isconsumer=(req,res,next)=>{
    try {

        if(req.user.role !=="Consumer"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for consumer"
            })
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

// 1.20.16 aunth and auth 2 

exports.isAdmin=(req,res,next)=>{
    try {

        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User role is not matching"
        })
    }
}