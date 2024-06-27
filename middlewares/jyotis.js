const Jyotis = require("../models/jyotis");

exports.checkJyotis = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.jyotisId;
    let jyotis = await Jyotis.findById(id);
    if (!jyotis) {
      return res.status(404).json({ message: "Jyotis not found" });
    }
    next();
    console.log("Jyotis found")
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.checkTimeSlot = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
