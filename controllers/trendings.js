const Products = require('../models/product')
const Orders = require('../models/orders')
const Payments = require('../models/payment')
const lodash = require('lodash')
const getAllProducts = async () => {
  try {
    const products = await Products.find({ isDeleted: false })
    return products
  } catch (error) {
    console.error(error)
    return error
  }
}
const getAllOrders = async () => {
  try {
    const orders = await Orders.find({ isDeleted: false })
    return orders
  } catch (error) {
    console.error(error)
    return error
  }
}
const getAllPayments = async () => {
  try {
    const payments = await Payments.find({ isDeleted: false })
    return payments
  } catch (error) {
    console.error(error)
    return error
  }
}

// filter those products which are ordered most
const getMostOrderedProducts = async () => {
  try {
    const products = await getAllProducts()
    const payments = await getAllPayments()
    let mostOrderedProducts = []
    for (let i = 0; i < products.length; i++) {
      let count = 0
      for (let j = 0; j < payments.length; j++) {
        if (
          products[i]._id.toString() === payments[j].productId.toString() &&
          payments[j].isDeleted === false
        ) {
          count++
        }
      }

      if (count > 3) {
        mostOrderedProducts.push({
          productId: products[i]._id,
          quantity: products[i].quantity,
          productName: products[i].name,
          count: count,
        })
        let product = await Products.findById({ _id: products[i]._id })
        product.isTrending = true
        product.isBestSeller = true
        await product.save()
      }
    }
    mostOrderedProducts.sort((a, b) => {
      return b.count - a.count
    })

    // remove the duplicate products
    let uniqueProducts = lodash.uniqBy(mostOrderedProducts, 'productId')

    return uniqueProducts
  } catch (error) {
    return error
  }
}
const getAverageOfMostOrderedProducts = async () => {
  try {
    const mostOrderedProducts = await getMostOrderedProducts()

    let average = 0
    for (let i = 0; i < mostOrderedProducts.length; i++) {
      average += mostOrderedProducts[i].count
    }
    average = average / mostOrderedProducts.length
 

    return average
  } catch (error) {
    return error
  }
}
module.exports = {
  getMostOrderedProducts,
  getAverageOfMostOrderedProducts,
}
