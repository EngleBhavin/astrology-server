const router = require("express").Router();
const { authenticateToken } = require("../middlewares/auth");
const { checkUser } = require("../middlewares/user");
const { checkAdmin } = require("../middlewares/adminmiddleware");

const Kundali = require("../controllers/kundali");
const { checkKundaliDetails } = require("../middlewares/kundali");

router.post("/create", [authenticateToken, checkUser,checkKundaliDetails], Kundali.createKundali);
router.get("/get",     [authenticateToken, checkUser], Kundali.getKundali);
router.get("/get/:id", [authenticateToken], Kundali.getKundaliById);
router.get("/get-all", [authenticateToken, checkAdmin], Kundali.getAllKundali);

router.post(
  "/update/:id",
  [authenticateToken, checkUser],
  Kundali.updateKundali 
);
router.post(
  "/ask-question",
  [authenticateToken, checkUser,checkKundaliDetails],
  Kundali.askQuestion
);
router.post(
  "/answer-question/:id",
  [authenticateToken, checkAdmin],
  Kundali.replyQuestion
);
module.exports = router;
