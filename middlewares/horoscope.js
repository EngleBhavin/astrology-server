const Horoscope = require("../models/horoscope");
const HoroscopeCategory = require("../models/horoscopeCategory");

// exports.checkHoroscopeCategory = async (req, res, next) => {
//   try {
//     let { name } = req.body;
//     const check = await HoroscopeCategory.findOne({ name: name });
//     if (check) {
//       return res
//         .status(400)
//         .json({ message: "Horoscope category already exists" });
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

exports.checkCategoryId = async (req, res, next) => {
  try {
   
    let id 
    if(req.body.horoscopeCategory !== req.params.id){
      id = req.body.horoscopeCategory
    }
    console.log(req.params.id)
    const check = await HoroscopeCategory.findOne({ _id: id });
    if (!check) {
      return res
        .status(400)
        .json({ message: "Horoscope category does not exist" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.checkValidHoroscope = async (req, res, next) => {
  try {
    let id ;
    if(req.body.horoscope){
        id = req.body.horoscope
    }else{
        id = req.params.id
    }
    const check = await Horoscope.findOne({ _id: id });
    console.log(check)
    if (!check) {
      return res.status(400).json({ message: "Horoscope does not exist" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
