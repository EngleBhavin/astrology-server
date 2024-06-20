const Payment = require("../models/payment");
const User = require("../models/users");
const Product = require("../models/product");
const {generatePaymentId} = require("../global/global");

exports.createPayment = async (req, res) => {
    let {products,paymentType,status} = req.body;
    try {
        let price = [], quantity = [],name = [],ids = [];
        for(let i =0;i<products.length;i++){
            let product = await Product.findById(products[i].productId);
            if(+product.quantity < +products[i].quantity){
                return res.status(400).json({ message: "Product quantity is less than the requested quantity" });
            }
            const total = +product.price * +products[i].quantity;
            price.push(total);
            ids.push(product._id);
            quantity.push(+product.quantity);
            name.push(product.name);
        }
        const paymentId = await generatePaymentId();
        let payment = new Payment();
        payment.userId = req.user.userId;
        payment.productId = ids;
        payment.paymentType = paymentType;
        payment.paymentStatus = status||"pending";
        payment.amount = price;
        payment.paymentId = paymentId;
        payment.quantity = quantity;
        await payment.save();
        // update product quantity
        for(let i =0;i<products.length;i++){
            let product = await Product.findById(products[i].productId);
            const newQuantity = +product.quantity - +products[i].quantity;
            product.quantity = newQuantity;
            await product.save();
        }

        return res.status(200).json({ message: "Payment created successfully",  paymentId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};