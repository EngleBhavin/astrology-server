const PaymentController = require('../controllers/payment');
const middleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/adminmiddleware');
const router = require('express').Router();
const userMiddleware = require('../middlewares/user');

router.post('/create', [middleware.authenticateToken, userMiddleware.checkUser], PaymentController.createPayment);

module.exports = router;
