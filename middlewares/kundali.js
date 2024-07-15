const Kundali = require("../models/kundali");
// const Question = require("../models/question");

exports.checkKundali = async (req, res, next) => {
  try {
    const kundali = await Kundali.findOne({ _id: req.params.id });
    if (!kundali) {
      return res.status(404).json({ message: "Kundali not found" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.checkKundaliDetails = async (req, res, next) => {
  try {
    const { name, dob, tob, birthPlace, question } = req.body;
    //  I want to usee any method to check if the kundali details are correct or not
    const kundaliData = [name, dob, tob, birthPlace, question];
    if (kundaliData.includes("")) {
      return res
        .status(400)
        .json({ message: "Please provide all the details" });
    }
    //  If the details are correct then I want to call the next middleware

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.checkQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;
    if (question === "") {
      return res.status(400).json({ message: "Please provide the question" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
