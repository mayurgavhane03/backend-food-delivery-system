const express = require('express');
const app=express();
const fileupload =require('express-fileupload');
app.use(fileupload(
{
     useTempFiles : true,
    tempFileDir : '/tmp/'
}
));

require("dotenv").config();
const cookirParser = require("cookie-parser");
 
const PORT=process.env.PORT || 5000;

app.use(express.json());
// request ki body me se json ko parse karne ke liye express.json() ko use karte hai.

app.use(cookirParser())
require("./config/db").dbConnect();
require('./config/cloudinary').cloudinaryConnect();


// import Routes and mount 

const user = require('./routes/user');
app.use("/api/v1",user);

// activate the server 
app.listen(PORT,()=>{
    console.log(`App is activated at PORT ${PORT} `);
})


// what is cokkie parcer

