const Jyotis = require("../models/jyotis");
const { globalImageUploader } = require("../global/fileUploader");

exports.addJyotis = async (req, res) => {
  const {
    name,
    email,
    mobileNumber,
    gender,
    countryCode,
    description,
    rating,
    experience,
    expertIn,
    timeSlots,
  } = req.body;
  try {
    let jyotis = await Jyotis.findOne({ email: email });
    if (jyotis) {
      return res.status(400).json({ message: "Jyotis already exists" });
    }
    jyotis = new Jyotis();
    jyotis.name = name;
    jyotis.email = email;
    jyotis.mobileNumber = mobileNumber;
    jyotis.gender = gender;
    jyotis.countryCode = countryCode;
    jyotis.description = description;
    jyotis.rating = rating;
    jyotis.experience = experience;
    jyotis.expertIn = expertIn;
    await jyotis.save();
    return res.status(200).json({ message: "Jyotis added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateJyotis = async (req, res) => {
  let {
    name,
    email,
    mobileNumber,
    gender,
    countryCode,
    description,
    rating,
    experience,
    expertIn,
    isDeleted,
  } = req.body;
  console.log(req.body)
  let address = req.body.address? JSON.parse(req.body.address) : {};
  try {
    const jyotis = await Jyotis.findById(req.params.id);
    if (req?.files || req?.file) {
      if (req.files.length > 0) {
        const image = await globalImageUploader(req.files[0], jyotis._id, "jyotis");
        jyotis.image = image.Location;
        await jyotis.save();
      }
      if (req.file) {
        const image = await globalImageUploader(req.file, jyotis._id,"jyotis");
        jyotis.image = image.Location;
        await jyotis.save();
      }
    }
    // Auth details update
    jyotis.name = name ? name : jyotis.name;
    jyotis.email = email ? email : jyotis.email;
    jyotis.mobileNumber = mobileNumber ? mobileNumber : jyotis.mobileNumber;
    jyotis.countryCode = countryCode ? countryCode : jyotis.countryCode;
    // Professioanl details update
    jyotis.gender = gender ? gender : jyotis.gender;
    jyotis.description = description ? description : jyotis.description;
    jyotis.rating = rating ? rating : jyotis.rating;
    jyotis.experience = experience ? experience : jyotis.experience;
    jyotis.expertIn = expertIn ? expertIn : jyotis.expertIn;
    // Address details update
    if(!jyotis.address) jyotis.address = {};
    jyotis.address.city = address.city ? address.city : jyotis.address.city;
    jyotis.address.state = address.state ? address.state : jyotis.address.state;
    jyotis.address.country = address.country
      ? address.country
      : jyotis.address.country;
    jyotis.address.pincode = address.pincode
      ? address.pincode
      : jyotis.address.pincode;
    jyotis.address.building = address.building
      ? address.building
      : jyotis.address.building;

    if (isDeleted) {
      jyotis.isDeleted = isDeleted;
      jyotis.deletedAt = Date.now();
    }
    await jyotis.save();
    return res.status(200).json({ message: "Jyotis updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllJyotis = async (req, res) => {
  try {
    const jyotis = await Jyotis.find({ isDeleted: false });
    return res.status(200).json({ jyotis });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getJyotis = async (req, res) => {
  try {
    const jyotis = await Jyotis.findById(req.params.id);
    return res.status(200).json({ jyotis });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.addTimeSlot = async (req, res) => {
  const { timeSlots } = req.body;
  console.log(JSON.stringify(timeSlots))
  try {
    const jyotis = await Jyotis.findById(req.params.id);
   
    /**
     * [
    {
        "day":"Monday",
        "time":[
            {"start":"10:00","end":"11:00"},
            {"start":"11:00","end":"12:00"},
            {"start":"02:00","end":"03:00"},
            {"start":"03:00","end":"04:00"}
        ]
    },
    {
        "day":"Tuesday",
        "time":[
            {"start":"10:00","end":"11:00"},
            {"start":"11:00","end":"12:00"}
        ]
    }
]
     */
    jyotis.timeSlots = timeSlots;
    await jyotis.save();
    console.log(jyotis)
    return res.status(200).json({ message: "Time slot added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.removeTimeSlot = async (req, res) => {
  const { timeSlots } = req.body;
  try {
    const jyotis = await Jyotis.findById(req.params.id);
    jyotis.timeSlots = timeSlots;
    await jyotis.save();
    return res.status(200).json({ message: "Time slot removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteJyotis = async (req, res) => {
  try {
    const jyotis = await Jyotis.findById(req.params.id);
    jyotis.isDeleted = true;
    jyotis.deletedAt = Date.now();
    await jyotis.save();
    return res.status(200).json({ message: "Jyotis deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

exports.changeJyotisImage = async (req, res) => {
  try {
    const jyotisId = req.params.id;
    console.log(req.file || req.files)
    const image = await globalImageUploader(req.files[0], jyotisId, "jyotis");
    let jyotis = await Jyotis.findOne({
      _id: jyotisId,
      isDeleted: false,
    });
    jyotis.image = image?.Location;
    await jyotis.save();
    return res.status(200).json({ message: "Jyotis image changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
exports.deletedJyotish = async (req, res) => {
  try {
    const jyotis = await Jyotis.find({ isDeleted: true });
    return res.status(200).json({ jyotis });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.retrieveJyotis = async (req, res) => {
  try {
    const ids = req.body.ids;
  // Update the isDeleted field to false
    const jyotis = await Jyotis.updateMany(
      { _id: { $in: ids } },
      { $set: { isDeleted : false } }
    );


    return res.status(200).json({ message: "Jyotis retrieved successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}