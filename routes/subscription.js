const Subscription = require('../controllers/subscription');
const { checkSubscription } = require('../middlewares/subscription');
const { authenticateToken } = require('../middlewares/auth');
const { checkUser } = require('../middlewares/user');
const {checkValidPlan} = require('../middlewares/plan');

const router = require('express').Router();

router.post('/create',[authenticateToken,checkUser,checkValidPlan,checkSubscription],Subscription.createSubscription);



module.exports = router;