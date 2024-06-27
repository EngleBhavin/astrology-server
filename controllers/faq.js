const faq = require("../models/faqs");

exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    let faqData = new faq({
      question,
      answer,
    });
    await faqData.save();
    return res.status(201).json({ message: "Faq created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getFaqs = async (req, res) => {
  try {
    const faqs = await faq.find({ isDeleted: false });
    return res.status(200).json({ faqs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const id = req.params.id;
    const { isDeleted,answer } = req.body;
    const faqs = await faq.findByIdAndUpdate(
      { _id: id },
      {
        isDeleted: isDeleted,
        answer: answer,
      }
    );
    return res.status(200).json({ message: "Faq updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.getFaq = async (req, res) => {
  try {
    const faqs = await faq.findOne({ _id: req.params.id });
    return res.status(200).json({faq: faqs});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
