const Order = require("../controllers/order.js");
const User = require("../controllers/users.js");
const Product = require("../controllers/product.js");
const Payment = require("../controllers/payment.js");
const global = require("../global/global.js");
const router = require("express").Router();
const middleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminmiddleware");
const userMiddleware = require("../middlewares/user");

router.post(
  "/create",
  [middleware.authenticateToken, userMiddleware.checkUser],
  Order.createOrder
);
router.get(
  "/get",
  [middleware.authenticateToken, userMiddleware.checkUser],
  Order.getOrder
);
router.get(
  "/get/:id",
  [middleware.authenticateToken,],
  Order.getOrderById
);
router.get(
  "/cancel/:id",
  [middleware.authenticateToken, userMiddleware.checkUser],
  Order.cancelOrder
);

router.get('/getall', [middleware.authenticateToken, adminMiddleware.checkAdmin], Order.getAllOrders)

router.post('/update/:id', [middleware.authenticateToken, adminMiddleware.checkAdmin], Order.updateOrderStatus)
// getTotalSoldPruducts
router.get('/get-total-sold-products', [middleware.authenticateToken, adminMiddleware.checkAdmin], Order.getTotalSoldPruducts)
module.exports = router;
