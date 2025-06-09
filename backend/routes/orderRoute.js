import express from 'express'
import {updateStatus,userOrders,allOrders,placeOrder,placeOrderRazorpay,placeOrderStripe, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter=express.Router();
// Admin features 
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

// Payment featues 

orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

// User feature 
orderRouter.post('/userorders',authUser,userOrders);
orderRouter.post('/verifyStripe',authUser,verifyStripe);
export default orderRouter;





