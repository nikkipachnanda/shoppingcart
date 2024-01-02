import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

//Create Order4
const addOrderItems = asyncHandler(async (req, res) => {

    const userId = req.user?._id;
 //   console.log("user" + userId);
  //  res.send('create order');
    const {

      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
    
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
      //  user: "6566123f9a4ae45f6208bc6b",
        user:userId,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
  
      const createdOrder = await order.save();
  
      res.status(201).json(createdOrder);
    }
  });


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.userId._id });
    console.log("orders" + orders);
    res.json(orders);
  });


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
 // res.send('get order by id');
 const order = await Order.findById(req.params.id).populate(
  'user',
  'name email'
);

if (order) {
  res.json(order);
} else {
  res.status(404);
  throw new Error('Order not found');
}
});

//udpate order to paid
const updateOrderToPaid = asyncHandler (async (req, res) =>{
  res.send('update order to paid');
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
})


//udpate order to deliver /admin
const updateOrderToDelivered = asyncHandler (async (req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order) {
      order.isDelivered = true;
      order.deliveredAt =  Date.now();
      const updatedOrder = await order.save();
      res.status(200).json(order);
    }
    else {
      res.status(404);
      throw new Error('Order Not Found');
    }
    
});


//Get all orders all
const getOrders = asyncHandler (async (req, res) =>{
//    const orders = await Order.find({}).populate('user', 'id name');
 //   res.status(200).json(orders);

 const pageSize = 8;
 const page = Number(req.query.pageNumber) || 1;
 const keyword = req.query.keyword ? 
 {name: {$regex:req.query.keyword, $options:'i'}}
  :{}; 

 const count = await Order.countDocuments({...keyword});

 const orders = await Order.find({...keyword})
 .limit(pageSize)
 .skip(pageSize * (page -1));
  res.json({orders, page, pages:Math.ceil(count/pageSize)});

})


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}




