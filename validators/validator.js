const emailVaidator = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};
const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!emailVaidator(email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }
  next();
}

const mobileNumberValidator = (mobileNumber) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(mobileNumber);
};
const signup = (req, res, next) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }
  if (!mobileNumberValidator(mobileNumber)) {
    return res.status(400).json({ message: "Mobile number is invalid" });
  }
  next();
};


const nameValidator = (name) => {
  const nameRegex = /^[a-zA-Z ]{2,30}$/;
  return nameRegex.test(name);
};

const validateName = (req, res, next) => {
  const { firstName, lastName } = req.body;
  if (!firstName) {
    return res.status(400).json({ message: "First name is required" });
  }
  if (!nameValidator(firstName)) {
    return res.status(400).json({ message: "First name is invalid" });
  }
  if (!lastName) {
    return res.status(400).json({ message: "Last name is required" });
  }
  if (!nameValidator(lastName)) {
    return res.status(400).json({ message: "Last name is invalid" });
  }
  next();
};

// const dateOfBirthValidator = (dateOfBirth) => {
//   const dateOfBirthRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
//   return dateOfBirthRegex.test(dateOfBirth);
// };
const validateDateOfBirth = (req, res, next) => {
  const { dateOfBirth } = req.body;
  if (!dateOfBirth) {
    return res.status(400).json({ message: "Date of birth is required" });
  }
  // if (!dateOfBirthValidator(dateOfBirth)) {
  //   return res.status(400).json({ message: "Date of birth is invalid" });
  // }
  next();
};


const otpValidator = (otp) => {
  const otpRegex = /^[0-9]{6}$/;
  return otpRegex.test(otp);
};
const authenticate = (req, res, next) => {
  const { mobileNumber, otp } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }
  if (!mobileNumberValidator(mobileNumber)) {
    return res.status(400).json({ message: "Mobile number is invalid" });
  }
  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }
  if (!otpValidator(otp)) {
    return res.status(400).json({ message: "OTP is invalid" });
  }
  next();
};


module.exports = {
  emailVaidator,
  mobileNumberValidator,
  nameValidator,
  signup,
  authenticate,
  validateEmail,
  validateName,validateDateOfBirth
};
