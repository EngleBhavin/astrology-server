const Kundali = require("../models/kundali");
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
      //   const qtn = new Question({
      //     question,
      //     kundali: kundali._id,
      //     user: req.user.userId,
      //   });
      //   await qtn.save();
    }
    /*  else {
      const que = await Question.findOne({ user: req.user.userId, question });
      if (!que) {
        const qtn = new Question({
          question,
          user: req.user.userId,
          kundali: checkKundali._id,
        });
        await qtn.save();
      } else {
        return res.status(400).json({ message: "Question already asked" });
      }
    }
      */
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
    // const question = await Question.find();
    // // console.log(question);
    // // Now merge the kundali and question
    // // There are many questions for a single user so we need to filter the question for each user

    // const response = kundali.map((k) => {
    //   const q = question.find(
    //     (q) => q.user.toString() === k.user._id.toString()
    //   );
    //   console.log(q);
    //   return {
    //     ...k._doc,
    //     question: q.question,
    //     answer: q.answer,
    //   };
    // });
    // // Now we we merge the kundali and question together

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
    const { answer } = req.body;
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
    question.answer = answer;
    await que.save();
    return res.status(200).json({ message: "Question replied successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
