const mongoose = require('mongoose');

exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGOURL)
    .then(()=>console.log("DB connection sucessful"))
    .catch((err)=>{
        console.log("DB connection failed");
        console.error(err);
        process.exit(1);
    })
}