const router = require("express").Router();
const AdminController = require("../controllers/admin");
const validate = require("../validators/validator");
const middleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminmiddleware");

router.post("/sign-up", [validate.validateEmail], AdminController.signup);
router.post("/auth", [validate.validateEmail], AdminController.authenticate);
router.post(
  "/update-profile",
  [middleware.authenticateToken, adminMiddleware.checkAdmin],
  AdminController.update
);
router.post("/login", AdminController.login);

module.exports = router;
