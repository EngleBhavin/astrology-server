const Category = require('../models/category')
// const SubCategory = require('../models/subCategory')
const Product = require('../models/product')
const { imageUpload } = require('../global/fileUploader')
const Discount = require('../models/discount')
const CarouselProducts = require('../models/carouselProducts')
const lodash = require('lodash')
const { getMostOrderedProducts ,getAverageOfMostOrderedProducts} = require('./trendings')
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      // subCategory,
      price,
      discount,
      HSNCODE,
      GST,
      currency,
      inStock,
      quantity,
      SKU,
    } = req.body
    // subCategory
    let product = await Product.findOne({ name, category })
    if (product) {
      return res.status(400).json({ message: 'Product already exists' })
    }
    product = new Product()
    product.name = name
    product.description = description
    product.category = category
    // product.subCategory = subCategory
    product.price = price
    product.currency = currency
    product.discount = discount
    product.HSNCODE = HSNCODE
    product.GST = GST
    product.inStock = inStock
    product.quantity = quantity
    product.SKU = SKU

    if (req.files || req.file) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const image = await imageUpload(req.files[file], product._id)
          product.image.push(image.Location)
        }
        await product.save()
      }
      if (req.file) {
        const image = await imageUpload(req.file, product._id)
        product.image.push(image.Location)
        await product.save()
      }
    }
    await product.save()
    return res.status(200).json({ message: 'Product added successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      // subCategory,
      price,
      currency,
      discount,
      HSNCODE,
      GST,
      inStock,
      quantity,
      SKU,
      isDeleted,
    } = req.body
    // console.log(req.body)
    const id = req.params.id
    let product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    product.name = name ? name : product.name
    product.description = description ? description : product.description
    product.category = category ? category : product.category
    // product.subCategory = subCategory ? subCategory : product.subCategory
    product.price = price ? price : product.price
    product.currency = currency ? currency : product.currency
    product.discount = discount ? discount : product.discount
    product.HSNCODE = HSNCODE ? HSNCODE : product.HSNCODE
    product.GST = GST ? GST : product.GST
    product.inStock = inStock ? inStock : product.inStock
    product.quantity = quantity ? quantity : product.quantity
    product.SKU = SKU ? SKU : product.SKU
    product.isDeleted = isDeleted ? isDeleted : product.isDeleted
    if (isDeleted) {
      product.deletedAt = Date.now()
    }

    if (req.files || req.file) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const image = await imageUpload(req.files[file], product._id)
          product.image.push(image.Location)
        }
        await product.save()
      }
      if (req.file) {
        const image = await imageUpload(req.file, product._id)
        product.image.push(image.Location)
        await product.save()
      }
    }
    await product.save()
    return res.status(200).json({ message: 'Product updated successfully' , product:product})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.removeImage = async (req, res) => {
  try {
    const id = req.params.id
    const imageId = req.body.imageUrl
    let product = await Product.findOne({ _id: id })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    product.image = product.image.filter((image) => image != imageId)
    await product.save()
    return res.status(200).json({ message: 'Image removed successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.addImage = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
   
    if (req?.files || req?.file) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const image = await imageUpload(req.files[file], product._id)
          product.image.push(image.Location)
        }
        await product.save()
      }
      if (req.file) {
        const image = await imageUpload(req.file, product._id)
        product.image.push(image.Location)
        await product.save()
      }
    }
    await product.save()
    return res.status(200).json({ message: 'Image added successfully' })
  } catch (error) {

    return res.status(500).json({ message: error.message })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const isDeleted = req.body.isDeleted
    let product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    isDeleted
      ? (product.isDeleted = isDeleted)
      : (product.isDeleted = false)
    // product.isDeleted = isDeleted?isDeleted:product.
    product.deletedAt = isDeleted ? Date.now() : null
    await product.save()
    return res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.retrieveProducts = async (req, res) => {
  try{
    const ids = req.body.ids // is a array of product ids
    let products = await Product.find({ _id: { $in: ids } }).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      },
      // {
      //   path: 'subCategory',
      // },
    ])
    if(products.length === 0){
      return res.status(404).json({ message: 'Products not found' })
    }
   const result = await Product.updateMany({ _id: { $in: ids } }, { isDeleted: false })
   console.log(result)
    return res.status(200).json({ message: 'Products retrieved successfully' })
  }
  catch(error){
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
exports.getAllDeletedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: true }).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      }
   
    ])
    console.log(products)
    return res.status(200).json({ products })
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      },
     
    ])
    // this is only for automation of trending products
     await  getMostOrderedProducts()
     
    return res.status(200).json({ products })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
exports.getAllTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false,isTrending:true }).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      },
      // {
      //   path: 'subCategory',
      // },
    ])
    // this is only for automation of trending products
     await  getMostOrderedProducts()
     
    return res.status(200).json({ products })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      },
      // {
      //   path: 'subCategory',
      // },
    ])
    return res.status(200).json({ product })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.addDiscount = async (req, res) => {
  const id = req.params.id
  const { discountPercentage, name, description, isActivated } = req.body
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const discount = new Discount({
      discountPercentage,
      name,
      description,
      isActivated,
      product: product._id,
    })
    await discount.save()
    product.discount = discount._id
    await product.save()
    return res.status(200).json({ message: 'Discount added successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getProductsByCategory = async (req, res) => {
  try {
    const id = req.params.id
    const products = await Product.find({
      category: id,
      isDeleted: false,
    }).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      },
      // {
      //   path: 'subCategory',
      // },
    ])
    return res.status(200).json({ products })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

// exports.getProductsBySubCategory = async (req, res) => {
//   try {
//     const id = req.params.id
//     const products = await Product.find({
//       subCategory: id,
//       isDeleted: false,
//     }).populate([
//       {
//         path: 'discount',
//       },
//       {
//         path: 'category',
//       },
//       {
//         path: 'subCategory',
//       },
//     ])
//     return res.status(200).json({ products })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: error.message })
//   }
// }

// Get New Arrivals

exports.getNewArrivals = async (req, res) => {
  try {
    const productData = await Product.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate([
        {
          path: 'discount',
        },
        {
          path: 'category',
        },
        // {
        //   path: 'subCategory',
        // },
      ])
    const products = productData.filter((product) => {
      // check if product is arrived in last 7 days
      const date = new Date()
      const diffTime = Math.abs(date - product.createdAt)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays <= 90) {
        return product
      }
    })
    return res.status(200).json({ products })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
// count the total number of products in the database
exports.getTotalProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).countDocuments()
    return res.status(200).json({ products })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

// get five or less random products for carousel
exports.addProductsToCarousel = async (req, res) => {
  try {
    const { productId, toDisplay } = req.body
    const createCarousel = new CarouselProducts({
      productId,
      toDisplay,
    })
    await createCarousel.save()
    return res.status(200).json({ message: 'Product added to carousel' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.deleteProductsFromCarouselOrHide = async (req, res) => {
  try {
    const { productId, toDisplay } = req.body
    if (toDisplay) {
      const product = await CarouselProducts.findOne({ productId })
      product.toDisplay = false
      await product.save()
      return res
        .status(200)
        .json({ message: 'Product hide from carousel is successful' })
    } else {
      await CarouselProducts.findOneAndUpdate(
        { productId },
        {
          isDeleted: true,
          deletedAt: Date.now(),
        },
        { new: true },
      )
      return res.status(200).json({ message: 'Product removed from carousel' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getProductsForCarousel = async (req, res) => {
  try {
    const products = await CarouselProducts.find({
      toDisplay: true,
      isDeleted: false,
    }).populate([
      {
        path: 'productId',
        populate: [
          {
            path: 'discount',
          },
          {
            path: 'category',
          },
          // {
          //   path: 'subCategory',
          // },
        ],
      },
    ])
    if (products.length === 0) {
      const randomProducts = await getRandomProducts()
      return res.status(200).json({ products: randomProducts })
    }
    return res.status(200).json({ products })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
// search products
exports.searchProducts = async (req, res) => {
  try {
    const searchInput = req.query.searchInput
    const products = await Product.find({
      name: {
        $regex: searchInput,
        $options: 'i',
      },
    })
      .select('_id,name,images,price,discount')
      .populate([
        {
          path: 'discount',
        },
        {
          path: 'category',
        },
        // {
        //   path: 'subCategory',
        // },
      ])
    return res.status(200).send({
      products,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
// get similar products
exports.getSimilarProducts = async (req, res) => {
  try {
    // subCategory
    const { category } = req.body
    const products = await Product.find({
      category: category,
      // subCategory: subCategory,
      isDeleted: false,
    }).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      },
      // {
      //   path: 'subCategory',
      // },
    ])
    return res.status(200).send({
      products,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: error.message,
    })
  }
}

// get random up to 5 products for carousel
const getRandomProducts = async () => {
  try {
    const products = await Product.find({ isDeleted: false }).populate([
      {
        path: 'discount',
      },
      {
        path: 'category',
      },
      // {
      //   path: 'subCategory',
      // },
    ])
    const randomProducts = lodash.sampleSize(products, 5)
    return randomProducts
  } catch (error) {
    return error
  }
}

exports.bestSellingProducts = async (req, res) => {
  try {
    const mostOrderedProducts = await getAverageOfMostOrderedProducts()
    return res.status(200).json({ mostOrderedProducts })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

