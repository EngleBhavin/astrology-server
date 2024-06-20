const Appointment = require("../models/appointments");

exports.checkAppointment = async (req, res, next) => {
    try {
        const id = req.params.id || req.body.appointmentId;
        let appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};