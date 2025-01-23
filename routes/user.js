const express = require('express');

const router = express.Router();

const {login, signup}=require('../controllers/Auth');
const {auth, isconsumer, isAdmin}=require('../middlewares/auth')
const {setMenuItems,getMenuItems}= require('../controllers/Menu')
const { placeOrder, getUserOrders, updateOrderStatus } = require('../controllers/Order');

router.post('/login', login);

router.post('/signup',signup)

// testing protected routes for testing middleware,

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Protected routes for Testers"
    })
})

// Protected routes for customer

router.get("/customer",auth,isconsumer,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Protected routes for Consumer"
    })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Protected routes for Admin",
    })
})


// Routes for menu items
router.post('/menu', auth, isAdmin, setMenuItems); // Protected route for admin to set menu items
router.get('/menu', auth, getMenuItems);

// Order routes
router.post('/order', auth, placeOrder); // Place a new order
router.get('/orders', auth, getUserOrders); // Get all orders for the logged-in user
router.put('/order/:orderId/status', auth, isAdmin, updateOrderStatus); // Update order status (admin only)

module.exports = router;


