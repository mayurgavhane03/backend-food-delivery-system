/*

const mongoose = require('mongoose');

const menuSchema =new mongoose.Schema({
name:{
type:String,
required:true,
trim:true,
unique:true,
},
price:{
    type:Number,
    required:true,
    trim:true,
},
category:{
    type:String,
    required:true,
    trim:true,
},
availability:{
    type:Boolean,
    required:true,
    default:true
    
},
imageUrl:{ 
    type:String,
    required:true,
}
})

module.exports = mongoose.model("menu",menuSchema); 

*/

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'], // Ensure price is not negative
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Uncategorized', // Optional: Default category
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    imageUrl: {
      type: String,
      required: false, // Change to false if you want it optional
      validate: {
        validator: function (v) {
          // Basic validation for URL format
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid image URL`,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Menu', menuSchema);
