const userModel = require("../models/users");

const checkUser = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { checkUser };
