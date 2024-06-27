const Plan = require ('../controllers/plans');
const { checkPlan, checkValidPlanId } = require('../middlewares/plan');
const { authenticateToken } = require('../middlewares/auth');
const { checkAdmin } = require('../middlewares/adminmiddleware');
const router = require('express').Router();

router.post('/create',[authenticateToken,checkAdmin,checkPlan],Plan.createPlan);
router.post('/update/:id',[authenticateToken,checkAdmin,checkValidPlanId],Plan.updatePlan);
router.post('/delete/:id',[authenticateToken,checkAdmin,checkValidPlanId],Plan.deletePlan);
router.get('/get/:id',[authenticateToken,checkValidPlanId],Plan.planById);
router.get('/get',[authenticateToken],Plan.getPlans);

module.exports = router;