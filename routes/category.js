const router = require('express').Router();
const CategoryController = require('../controllers/category');
const middleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/adminmiddleware');
const validate = require('../validators/validator');
const {checkCategory} = require('../middlewares/product')
router.post('/create', [middleware.authenticateToken, adminMiddleware.checkAdmin], CategoryController.createCategory);
router.get('/get/:id', [middleware.authenticateToken], CategoryController.getCategory);
router.get('/get', [middleware.authenticateToken], CategoryController.getCategories);
router.post('/update/:id', [middleware.authenticateToken, adminMiddleware.checkAdmin], CategoryController.updateCategory);
router.post('/delete/:id', [middleware.authenticateToken, adminMiddleware.checkAdmin], CategoryController.deleteCategory);
module.exports = router;
