// const category = require("../models/category");
const Admin = require("../models/admin");
const Category = require("../models/category");
// const SubCategory = require('../models/subCategory')
const { imageUpload } = require("../global/fileUploader");

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  console.log(req.body);
  try {
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    category = await new Category();
    category.name = name;
    category.description = description;
    if (req.files?.length > 0 || req?.file !== undefined) {
      if (req?.files) {
        const image = await imageUpload(req.files[0], category._id);
        category.image = image.Location;
      }
      if (req?.file) {
        const image = await imageUpload(req.file, category._id);
        category.image = image.Location;
      }
    }
    await category.save();
    return res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description, isDeleted } = req.body;
    console.log(req.body)
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = !name?.length ==0  ? name : category.name;
    category.description = !description?.length==0 ? description : category.description;
    if (isDeleted == true) {
      category.isDeleted = isDeleted || category.isDeleted;
      category.deletedAt = Date.now();
    }
    console.log(req.files, req.file);
    if (req?.files.length > 0 || req?.file) {
      if (req?.file) {
        const image = await imageUpload(req.file, category._id);
        category.image = image?.Location;
      } else {
        const image = await imageUpload(req.files[0], category._id);
        category.image = image?.Location;
      }
    }
    await category.save();
    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.isDeleted = true;
    category.deletedAt = Date.now();
    await category.save();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    return res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    return res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
