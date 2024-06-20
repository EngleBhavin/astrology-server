const Subscrition = require("../models/subscription");
const User = require("../models/users");
const {
  hashGenerator,
  hashVerifier,
  subscriptionId,
  generatePaymentId,
  sendEmail,
} = require("../global/global");
const Payment = require("../models/payment");
const Plan = require("../models/plan");

exports.createSubscription = async (req, res) => {
  const { plan } = req.body;
  try {
   
    const sId = await subscriptionId();
    const getPlan = await Plan.findById(plan);
    let subcription = new Subscrition({
      plan,
      userId: req.user.userId,
      subscriptionId: sId,
    });
    await subcription.save();
    let payId = await generatePaymentId();
    // Import payment integration method here

    let payment = new Payment({
      userId: req.user.userId,
      paymentId: payId,
      subscriptionId: sId,
      amount: getPlan.amount,
      paymentType: "Card",
      paymentStatus: "Pending",
    });
    if (getPlan.planType === "monthly") {
      // set 30 days

      let planEndDate = new Date();
      planEndDate.setDate(planEndDate.getDate() + 30);
      subcription.planEndDate = planEndDate;
      subcription.planStartDate = Date.now();
      subcription.paymentId = payId;
      await subcription.save();
    }
    if (getPlan.planType === "quaterly") {
      // set 90 days
      let planEndDate = new Date();
      planEndDate.setDate(planEndDate.getDate() + 90);
      subcription.planEndDate = planEndDate;
      subcription.planStartDate = Date.now();
      subcription.paymentId = payId;
      await subcription.save();
    }
    if (getPlan.planType === "halfyearly") {
      // set 180 days
      let planEndDate = new Date();
      planEndDate.setDate(planEndDate.getDate() + 180);
      subcription.planEndDate = planEndDate;
      subcription.planStartDate = Date.now();
      subcription.paymentId = payId;
      await subcription.save();
    }
    if (getPlan.planType === "yearly") {
      // set 365 days
      let planEndDate = new Date();
      planEndDate.setDate(planEndDate.getDate() + 365);
      subcription.planEndDate = planEndDate;
      subcription.planStartDate = Date.now();
      subcription.paymentId = payId;
      await subcription.save();
    }
    await payment.save();
    // update user.subscriptionId
    await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: {
          subscription: subcription._id,
        },
      },
      {
        new: true,
      }
    );
    // send email to user
    return res
      .status(200)
      .json({ message: "Subscription created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// get my subscription
exports.getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscrition.findOne({ userId: req.user._id });
    return res.status(200).json({ subscription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
