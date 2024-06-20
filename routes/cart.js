const cartController = require('../controllers/cart');
const global = require('../global/global.js');
const router = require('express').Router();
const middleware = require('../middlewares/auth');
// const adminMiddleware = require('../middlewares/adminmiddleware');
const userMiddleware = require('../middlewares/user');
const {checkProduct} = require('../middlewares/product');

router.post('/add', [middleware.authenticateToken, userMiddleware.checkUser,checkProduct], cartController.addCart);
router.post('/update', [middleware.authenticateToken, userMiddleware.checkUser,checkProduct], cartController.updateCart);
router.get('/delete/:id', [middleware.authenticateToken, userMiddleware.checkUser], cartController.deleteCart);
router.get('/get', [middleware.authenticateToken, userMiddleware.checkUser], cartController.getCart);

module.exports = router;
