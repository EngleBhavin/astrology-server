// const SubCategory = require('../models/subCategory')
// const Category = require('../models/category')
// const { imageUpload } = require('../global/fileUploader')

// exports.createSubCategory = async (req, res) => {
//   try {
//     const { title, description, category } = req.body
//     let subCategory = await SubCategory.findOne({ title })
//     if (subCategory) {
//       return res.status(400).json({ message: 'SubCategory already exists' })
//     }
//     subCategory = new SubCategory()
//     subCategory.title = title
//     subCategory.description = description
//     subCategory.category = category
//     if ( req.files.length > 0 || req.file ) {

//       if (req.files) {
//         const image = await imageUpload(req.files[0], subCategory._id)
//         subCategory.image = image.Location
//       } else {
//         const image = await imageUpload(req.file, subCategory._id)
//         subCategory.image = image.Location
//       }
//     }

//     await subCategory.save()
//     return res.status(200).json({ message: 'SubCategory created successfully' })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: error.message })
//   }
// }

// exports.updateSubCategory = async (req, res) => {
//   try {
//     const { title, description, category, isDeleted } = req.body
//     const id = req.params.id

//     let subCategory = await SubCategory.findById(id)
//     if (!subCategory) {
//       return res.status(404).json({ message: 'SubCategory not found' })
//     }
//     subCategory.title = title ? title : subCategory.title
//     subCategory.description = description
//       ? description
//       : subCategory.description
//     subCategory.category = category ? category : subCategory.category
//     subCategory.isDeleted = isDeleted ? isDeleted : subCategory.isDeleted
//     if (isDeleted) {
//       subCategory.deletedAt = Date.now()
//     }
//     if (req.file || req.files.length > 0) {
//       if (req.files) {
//         const image = await imageUpload(req.files[0], subCategory._id)
//         subCategory.image = image.Location
//       } else {
//         const image = await imageUpload(req.file, subCategory._id)
//         subCategory.image = image.Location
//       }
//     }
//     await subCategory.save()
//     return res.status(200).json({ message: 'SubCategory updated successfully' })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: error.message })
//   }
// }

// exports.deleteSubCategory = async (req, res) => {
//   try {
//     const id = req.params.id
//     let subCategory = await SubCategory.findById(id)
//     if (!subCategory) {
//       return res.status(404).json({ message: 'SubCategory not found' })
//     }
//     subCategory.isDeleted = true
//     subCategory.deletedAt = Date.now()
//     await subCategory.save()
//     return res.status(200).json({ message: 'SubCategory deleted successfully' })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: error.message })
//   }
// }

// exports.getSubCategories = async (req, res) => {
//   try {
//     const subCategory = await SubCategory.find({ isDeleted: false })
//     return res.status(200).json({ subCategory })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: error.message })
//   }
// }
// exports.getSubCategory = async (req, res) => {
//   try {
//     // where category 
//     const category = await Category.findById(req.params.id)
//     const subCategory = await SubCategory.find({ category: category._id,isDeleted: false }).populate('category');
//     return res.status(200).json({ subCategory })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: error.message })
//   }
// }