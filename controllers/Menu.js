const Menu= require("../models/Menu");
const cloudinary =require('../config/cloudinary')

exports.setMenuItems = async (req, res) => {
    const { name, price, availability, category } = req.body;
  
    try {
      // Step 1: Create menu item without imageUrl
      const menu = new Menu({
        name,
        price,
        availability,
        category,
      });
  
      // await menu.save();
  
      // Step 2: Upload image to Cloudinary
      /*
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Codehelp',
        });
  
        // Update the menu item with the Cloudinary URL
        menu.imageUrl = result.secure_url;
        await menu.save();
      }

      */

      // imageUpload(req.files.imageFile);
      if (req.files && req.files.imageFile) {
        const imageUrl = await require("../controllers/localfileupload").imageUpload(req.files.imageFile);
        menu.imageUrl = imageUrl;
    }

    // Step 3: Save the menu item
    await menu.save();
  
      res.status(200).json({
        success: true,
        data: menu,
      });
    } catch (error) {
      console.error('Error while setting menu item:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error while setting the menu',
      });
    }
  };
  
  exports.getMenuItems = async (req, res) => {
    try {
      // Fetch all menu items from the database
      const menu = await Menu.find();
  
      // Check if no menu items exist
      if (!menu || menu.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No menu items found. Please add menu items.",
        });
      }
  
      // Respond with the retrieved menu items
      res.status(200).json({
        success: true,
        data: menu,
      });
    } catch (error) {
      // Log and respond with an error message
      console.error("Error while fetching menu items:", error.message);
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching menu items",
      });
    }
  };
  