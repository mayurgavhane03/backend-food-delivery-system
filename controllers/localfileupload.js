/// this is used to upload file on server directry but we are not going to use it we are going to use Cloudinary for this

const Menu=require('../models/Menu')

const cloudinary= require('cloudinary').v2;

exports.localFileUpload=(req,res)=>{
    try {
        const file=req.files.file; // value=file
        console.log(file);
        let path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        // create files foulder in controller
        console.log("PATH",path);

        file.mv(path , (err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:'Local File uploaded sucessfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:'error in uploading the file'
        })
    }
}

/*

async function uploadFileToCloudinary(file,folder) {
    const options ={folder}
   return await cloudinary.uploader.upload(file.tempFilePath,options);
}
function isFileSupported(type,supportedTypes){
return supportedTypes.includes(type);
}
exports.imageupload = async (req,res)=>{
    try {
        // data fetch karlo from request

        
    const file=req.files.imageFile; // key=imageFile
    console.log(file);

    // validation 
    const supportedTypes = ["jpg","jpeg","png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    if(! isFileSupported(fileType,supportedTypes)){
        return res.status(500).json({
            success: false,
            message: "file type not supported"
        })
    }

    // file format supported

    const response= await uploadFileToCloudinary(file,"Codehelp");
    console.log(response);

   

    res.json({
        sucess:true,
        message:"Image successfully uploded"
    })
    
    } catch (error) {
        console.error(error);
        res.status(404).json({
            success:false,
            message:"something went wrong "
        })
    }
    }

    */

    // Function to upload file to Cloudinary
async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Function to check if the file type is supported
function isFileSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// Exported function for image upload
exports.imageUpload = async (file) => {
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (!isFileSupported(fileType, supportedTypes)) {
        throw new Error("File type not supported");
    }

    // Upload the file to Cloudinary
    const response = await uploadFileToCloudinary(file, "Codehelp");
    return response.secure_url;
};