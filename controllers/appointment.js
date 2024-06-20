const Jyotis = require("../models/jyotis");
const Appointment = require("../models/appointments");
const User = require("../models/users");
const lodash = require("lodash");

exports.bookAppointment = async (req, res) => {
  const { date, time, jyotisId, status } = req.body;
  try {
    let appointment = await Appointment.findOne({
      user: req.user.userId,
      jyotis: jyotisId,
      date,
      time,
    });
    if (appointment) {
      return res.status(400).json({ message: "Appointment already exists" });
    }
    let checkAppointment = await Appointment.findOne({
      jyotis: jyotisId,
      date,
      time,
    }).sort({ createdAt: -1 });
    if (checkAppointment) {
      return res.status(400).json({ message: "No slots available" });
    }
    checkAppointment = new Appointment({
      user: req.user.userId,
      jyotis: jyotisId,
      date,
      time,
      status,
    });
    await checkAppointment.save();
    return res.status(200).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    console.log(req.body,req.query)
    let status = req.query.status;
    status = status.toUpperCase();
    let appointments = await Appointment.find({ user: req.user.userId,isDeleted:false, status })
      .populate({
        path: "jyotis",
        select: "name email image",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    let appointments = await Appointment.find({isDeleted:false})
      .populate([
        {
            path: "user",
            select: "firstName lastName mobileNumber countryCode email image",
        },
        {
            path: "jyotis",
            select: "name email",
        }
      ])
      .sort({ createdAt: -1 });

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    appointment.status = "CANCELLED";
    await appointment.save();
    return res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.acceptAppointment = async (req, res) => {
  try {
    const { status } = req.body;
    // console.log(req.body)
    let appointment = await Appointment.findById(req.params.id);
    appointment.status = status?status?.toUpperCase(): appointment.status;
    await appointment.save();
    return res.status(200).json({ message: "Appointment accepted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.getSingleAppointment = async (req, res) => {
  try{
    let appointment = await Appointment.findById(req.params.id)
    .populate([
      {
          path: "user",
          select: "firstName lastName mobileNumber countryCode email image",
      },
      {
          path: "jyotis",
          select: "name email",
      }
    ])
    return res.status(200).json({ appointment });
  }catch(error){
    return res.status(500).json({ message: error.message });
  }
}

exports.getAllAppointmentsCount = async (req, res) => {
  try {
    let appointments = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    let data = lodash.keyBy(appointments, "_id");

    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}