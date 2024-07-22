const Kundali = require("../models/kundali");

const { imageUpload } = require("../global/fileUploader");
exports.createKundali = async (req, res) => {
  try {
    const { name, dob, tob, birthPlace, question } = req.body;
    const checkKundali = await Kundali.findOne({ user: req.user.userId });
    if (!checkKundali) {
      let kundali = new Kundali({
        name,
        dob,
        tob,
        birthPlace,
        user: req.user.userId,
      });

      await kundali.save();
      if (question) {
        await Kundali.findOneAndUpdate(
          { user: req.user.userId },
          { $push: { qta: { question } } }
        );
      }
    }
    return res.status(200).json({ message: "Kundali added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getKundali = async (req, res) => {
  try {
    const question = await Kundali.find({ user: req.user.userId }).populate([
      {
        path: "user",
        select: "firstName lastName email mobileNumber",
      },
    ]);

    return res
      .status(200)
      .json({ message: "Kundali fetched successfully", question });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getKundaliById = async (req, res) => {
  try {
    const kundali = await Kundali.findOne({ _id: req.params.id }).populate([
      {
        path: "user",
        select: "name email mobileNumber",
      },
    ]);

// console.log(kundali)
    return res
      .status(200)
      .json({ message: "Kundali fetched successfully", kundali });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllKundali = async (req, res) => {
  try {
    const kundali = await Kundali.find().populate([
      {
        path: "user",
        select: "firstName lastName email mobileNumber",
      },
    ]);
    return res
      .status(200)
      .json({ message: "Kundali fetched successfully", kundali });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateKundali = async (req, res) => {
  try {
    const { name, dob, tob, birthPlace } = req.body;
    let kundali = await Kundali.findOne({ _id: req.params.id });
    if (!kundali) {
      return res.status(404).json({ message: "Kundali not found" });
    }
    kundali.name = name;
    kundali.dob = dob;
    kundali.tob = tob;
    kundali.birthPlace = birthPlace;
    await kundali.save();
    return res.status(200).json({ message: "Kundali updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    let que = await Kundali.findOne({ user: req.user.userId });
    if (que?.qta?.map((q) => q.question).includes(question)) {
      return res.status(400).json({ message: "Question already asked" });
    } else {
      await Kundali.findOneAndUpdate(
        { user: req.user.userId },
        { $push: { qta: { question } } }
      );
    }
    return res.status(200).json({ message: "Question added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.replyQuestion = async (req, res) => {
  try {
    const { answer, imageUrl } = req.body;
    let image = imageUrl;
    console.log(req.body)
    let que = await Kundali.findOne({ _id: req.params.id });
    if (!que) {
      return res.status(404).json({ message: "Question not found" });
    }

    let question = que.qta.find((q) => {
      // console.log(q)
      return q._id == req.query.question;
    });
    // console.log(question);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    if (req.files || req.file) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const image = await imageUpload(req.files[file], req.params.id );
          question.image = image.Location;
        }
        await que.save();
      }
      if (req.file) {
        const image = await imageUpload(req.file, req.params.id );
        question.image = image.Location;
        await que.save();
      }
    }
    question.answer = answer;
    if (image && image.toString().startsWith("http") ){
      question.image = image;
    }
    await que.save();
    return res.status(200).json({ message: "Question replied successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
