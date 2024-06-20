const Subscription = require("../models/subscription");

exports.checkSubscription = async (req, res, next) => {
  try {


    let subscription = await Subscription.findOne({
      userId: req.user.userId,
      planEndDate: { $gt: Date.now() },
    });
    if (subscription) {
      return res.status(400).json({ message: "You are already subscribed" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.checkValidSubscription = async (req, res, next) => {
  try {
    if(req.user.role === 'admin'){
      return next();
    }
    let subscription = await Subscription.findOne({
        userId: req.user.userId,
        planEndDate: { $gt: Date.now() },
      });

    if (!subscription) {
      return res.status(400).json({ message: "Subscription not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
