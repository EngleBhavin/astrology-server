const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/users");

exports.addCart = async (req, res) => {
  try {
    let { productId, quantity } = req.body;
    let checkCart = await Cart.findOne({
        userId: req.user.userId,
       productId: productId ,isDeleted:false
        });
    if (checkCart) {
        return res.status(400).json({ message: "Product already in cart" });
        }
    let cart = new Cart();
    cart.userId = req.user.userId;
    cart.productId = productId;
    cart.quantity = quantity;
    await cart.save();
    return res.status(200).json({ message: "Product added to cart" });

} catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCart = async (req, res) => {
    try{
        let { productId, quantity } = req.body;
        let cart = await Cart.findOne({
            userId: req.user.userId,
            productId: productId,
            isDeleted:false
        });
        if (!cart) {
            return res.status(404).json({ message: "Product not found" });
        }
        cart.quantity = quantity;
        await cart.save();
        return res.status(200).json({ message: "Product updated successfully", cart });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try{
        let cart = await Cart.findOne({
            userId: req.user.userId,
            productId: req.params.id,
            isDeleted:false
        });
        if (!cart) {
            return res.status(404).json({ message: "Product not found" });
        }
        cart.isDeleted = true;
        cart.deletedAt = Date.now();
        await cart.save();

        return res.status(200).json({ message: "Product deleted successfully", cart });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    try{
        let cart = await Cart.find({userId:req.user.userId,isDeleted:false}).populate([
            {
                path: "userId",
            },
            {
                path: "productId",
            },
        ]);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ message: "Cart found successfully", cart });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};