// controller for orders

const Order = require('../models/Order');
const Menu= require('../models/Menu');
const mongoose =require('mongoose')
// Place a new order
exports.placeOrder = async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id; // Assume req.user is populated via authentication middleware
  
    try {
      // Validate menu items and calculate total price
      let totalAmount = 0;
      const validatedItems = [];
  
      for (const item of items) {
        const menuItem = await Menu.findById(item.menuItemId);
        if (!menuItem || !menuItem.availability) {
          return res.status(400).json({ message: `Menu item with ID ${item.menuItemId} is not available` });
        }
        totalAmount += menuItem.price * item.quantity;
        validatedItems.push({
          menuItemId: menuItem._id,
          quantity: item.quantity,
        });
      }
  
      // Create the order
      const order = new Order({
        userID: userId,
        items: validatedItems,
        status: "pending",
        createdAt: new Date(),
      });
  
      await order.save();
  
      res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
  };
  
  // Get orders for the logged-in user
  exports.getUserOrders = async (req, res) => {
    const userId = req.user.id; // Assume req.user is populated via authentication middleware
  
    try {
      const orders = await Order.find({ userID: userId }).populate('items.menuItemId', 'name price category');
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
  };
  
  // Update order status (admin functionality)

  
  exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    try {
      const validStatuses = ['pending', 'completed', 'cancelled'];
      if (!validStatuses.includes(status.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
  };     


  

// exports.updateOrderStatus = async (req, res) => {
//   const { orderId } = req.params;
//   const { status } = req.body;

//   try {
//     const validStatuses = ['pending', 'completed', 'cancelled'];
//     if (!validStatuses.includes(status.toLowerCase())) {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }

//     // Ensure the orderId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({ message: 'Invalid order ID' });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.status = status;
//     await order.save();

//     res.status(200).json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update order status', error: error.message });
//   }
// };
