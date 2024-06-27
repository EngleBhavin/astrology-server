const Appointment = require("../controllers/appointment");
const { checkJyotis } = require("../middlewares/jyotis");
const { checkAppointment } = require("../middlewares/appointment");
const { authenticateToken } = require("../middlewares/auth");
const { checkUser } = require("../middlewares/user");
const {checkAdmin} = require("../middlewares/adminmiddleware");

const router = require("express").Router();

router.post(
  "/book",
  [authenticateToken, checkJyotis, checkUser],
  Appointment.bookAppointment
);
router.get("/my", [authenticateToken,checkUser], Appointment.getMyAppointments);
router.get("/all", [authenticateToken,checkAdmin], Appointment.getAllAppointments);
router.post(
  "/update-appointment/:id",
  [authenticateToken, checkAppointment,checkAdmin],
  Appointment.acceptAppointment
);
router.post(
  "/cancel/:id",
  [authenticateToken, checkAppointment,checkUser],
  Appointment.cancelAppointment
);
router.post(
  "/cancel-appointment/:id",
  [authenticateToken, checkAppointment,checkAdmin],
  Appointment.cancelAppointment
);
router.get(
  "/get-appointment/:id",
  [authenticateToken, checkAppointment,checkAdmin],
  Appointment.getSingleAppointment
);
router.get('/get-all-count',[authenticateToken,checkAdmin],Appointment.getAllAppointmentsCount);
module.exports = router;
