const Product = require("../models/product");
const Category = require("../models/category");
// const SubCategory = require("../models/subCategory");
// const subCategory = require("../models/subCategory");
exports.checkProduct = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.productId;
    const product = await Product.findOne({ _id: id,isDeleted:false });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.checkCategory = async (req, res, next) => {
  try {
    const id = req.params.id|| req.body.categoryId;
    const category = await Category.findOne({ _id: id,isDeleted:false });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
// exports.checkSubCategory = async (req, res, next) => {
//   try {
//     const id = req.params.id|| req.body.subCategoryId;
//     const check = await subCategory.findOne({ _id: id });
//     if (!check) {
//       return res.status(404).json({ message: "SubCategory not found" });
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// }
