const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
require("dotenv").config();
const Order = require("../models/orders");
const transporter = require("../utils/mailSender");
const Payment = require("../models/payment");
const Subscription = require("../models/subscription");
const hashGenerator = async (input) => {
  const salt = 10;
  const hash = await bcrypt.hash(input, salt);
  return hash;
};
const hashVerifier = async (input, hash) => {
  const result = await bcrypt.compare(input, hash);
  return result;
};
const tokenGenerator = (input) => {
  const token = jwt.sign(input, process.env.JWT_SECRET,{
    expiresIn: "1d",
  });
  return token;
};

const tokenVerifier = (token) => {
  const decoded = jwt.verify(
    token.toString(),
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
      
        return err;
      }
      return decoded;
    }
  );
  return decoded;
};

const otpGenerator = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp)
  return otp;
};

const sendEmail = async (email, subject, html) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: subject,
    html: html,
  };
  const sender = await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log("mail sent");
  });

  return sender;
};
const orderIdGenerator = () => {
  // generate order id length 10 or greater
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let orderId = "";
  for (let i = 10; i > 0; --i)
    orderId += chars[Math.floor(Math.random() * chars.length)];
  return orderId;
};
const OrderId = async () => {
  const orderId = orderIdGenerator();
  const order = await Order.find({ orderId: orderId });
  if (order.length > 0) {
    OrderId();
  }
  return orderId;
};
const paymentIdGenerator = () => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let paymentId = "";
  for (let i = 15; i > 0; --i)
    paymentId += chars[Math.floor(Math.random() * chars.length)];
  return paymentId;
};
const generatePaymentId = async () => {
  const paymentId = paymentIdGenerator();
  const payment = await Payment.findOne({ paymentId: paymentId });
  if (payment) {
    paymentId();
  }
  return paymentId;
};
const subscriptionIdGenerator = () => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let subscriptionId = "";
  for (let i = 15; i > 0; --i)
    subscriptionId += chars[Math.floor(Math.random() * chars.length)];
  return subscriptionId;
};
const subscriptionId = async () => {
    
  const subscriptionId = subscriptionIdGenerator();
  const subscription = await Subscription.find();
  
  const checkId = lodash.find(subscription, { subscriptionId: subscriptionId });
  if (checkId) {
    subscriptionId();
  }
  return subscriptionId;
};

module.exports = {
  hashGenerator,
  hashVerifier,
  tokenGenerator,
  tokenVerifier,
  otpGenerator,
  sendEmail,
  OrderId,
  generatePaymentId,
  subscriptionId,
};
