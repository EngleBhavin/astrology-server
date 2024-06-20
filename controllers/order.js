const Order = require("../models/orders.js");
const User = require("../models/users.js");
const Product = require("../models/product.js");
const Payment = require("../models/payment.js");
const global = require("../global/global.js");
exports.createOrder = async (req, res) => {
  let { products, paymentId } = req.body;
  try {
    let order = new Order();
    let payment = await Payment.findOne({ paymentId: paymentId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    order.paymentId = payment._id;
    order.paymentGeneratedId = paymentId;
    order.userId = req.user.userId;
    order.orderId = await global.OrderId();
    await order.save();

    const OrderDetail = await Order.findById(order._id).populate([
      {
        path: "userId",
        // select: 'firstName lastName mobileNumber email'
      },
      {
        path: "paymentId",
        // select: 'paymentId'
        populate: {
          path: "productId",
        },
      },
    ]);
    return res
      .status(200)
      .json({ message: "Order created successfully", OrderDetail });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    let order = await Order.find({ userId: req.user.userId }).populate([
      {
        path: "userId",
        // select: 'firstName lastName mobileNumber email'
      },
      {
        path: "paymentId",
        // select: 'paymentId'
        populate: {
          path: "productId",
        },
      },
    ]);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order found successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id).populate([
      {
        path: "userId",
      },
      {
        path: "paymentId",
        populate: {
          path: "productId",
        },
      },
    ]);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order found successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const id = req.params.id;
    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = "cancelled";
    await order.save();
    return res
      .status(200)
      .json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // orderStatus:!"cancelled"
    const orders = await Order.find({ isDeleted: false }).populate([
      {
        path: "userId",
        select: "firstName lastName mobileNumber email address",
      },
      {
        path: "paymentId",
      },
    ]);
    return res
      .status(200)
      .json({ message: "Orders found successfully", orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.params.id;
    const status = req.body.status;
    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = status;
    await order.save();
    // send email to user
    console.log(order);
    return res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getTotalSoldPruducts = async (req, res) => {
  try {
    //  Fetch sold products data from Payment model
    const products = await Payment.find({ paymentStatus: "success" });
    if (!products) {
      return res.status(404).json({ message: " No Product sold yet" });
    }
    // fetch the date and month from the products
    
    let totalSold = 0,
      totalAmount = 0;
    products.map((product) => {
      totalSold += +product.quantity;
      totalAmount += +product.amount;
    });
    return res.status(200).json({
      message: "Total sold products",
      total: {
        totalSold: totalSold,
        totalAmount: totalAmount,
      },
      payments: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
