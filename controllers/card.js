const Horoscope = require('../models/horoscope')
const HoroscopeCategory = require('../models/horoscopeCategory')
const Card = require('../models/card')
const { globalImageUploader } = require('../global/fileUploader')
const horoscopeCategory = require('../models/horoscopeCategory')

exports.createCard = async (req, res) => {
  const { title, description, horoscopeCategory,horoscope } = req.body
  try {
    let card = new Card({
      title,
      description,
      horoscopeCategory,
      horoscope
    })
    await card.save()
    let cardData = await Card.findById(card._id)

    
    if (req.file || req?.files?.length > 0) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const image = await globalImageUploader(
            req.files[file],
            cardData._id,
            'card',
          )
          cardData.images.push(image.Location)
        }
        await cardData.save()
      } else {
        const image = await globalImageUploader(req.file, cardData._id, 'card')
        cardData.images.push(image.Location)
        await cardData.save()
      }
    }
    await cardData.save()
    return res.status(200).json({ message: 'Card created successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id.trim()).populate([
      {
        path: 'horoscopeCategory',
        model: 'HoroscopeCategory',
      },
      {
        path: 'horoscope',
        model: 'Horoscope',
      }

    ])
    return res.status(200).json({ card })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
exports.getCardsWithCatId = async(req,res)=>{
  try {
    const id = req.params.id
    const cards = await Card.find({
      horoscopeCategory:id,
      isDeleted:false,
      createdAt: { $gte: new Date(Date.now() - 24*60*60 * 1000) }
    }).populate('horoscopeCategory')
    return res.status(200).json({cards})
    } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.updateCard = async (req, res) => {
  const { title, description, horoscopeCategory,horoscope, isDeleted } = req.body
  try {
    let card = await Card.findById(req.params.id)
    card.title = title ? title : card.title
    card.description = description ? description : card.description
    card.horoscopeCategory = horoscopeCategory
      ? horoscopeCategory
      : card.horoscopeCategory
    card.horoscope = horoscope ? horoscope : card.horoscope
    card.isDeleted = isDeleted ? isDeleted : card.isDeleted
    if (isDeleted) {
      card.deletedAt = Date.now()
    }
    else{
      card.deletedAt = null
    }
    if (req.file || req.files) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const image = await globalImageUploader(
            req.files[file],
            card._id,
            'card', 
          )
          card.images.push(image.Location)
        }
        await card.save()
      } else {
        const image = await globalImageUploader(req.file, card._id, 'card')
        card.images.push(image.Location)
      }
    }
    await card.save()
    return res.status(200).json({ message: 'Card updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.deleteCard = async (req, res) => {
  try {
    let card = await Card.findById(req.params.id)
    card.isDeleted = true
    card.deletedAt = Date.now()
    await card.save()
    return res.status(200).json({ message: 'Card deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({ isDeleted: false }).populate([
    
      {
        path: 'horoscopeCategory',
        model: 'HoroscopeCategory',
        populate:{
          path:"horoscope"

        }
      },
    ])
    return res.status(200).json({ cards })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.addImage = async (req, res) => {
  try {
    const id = req.params.id || req.body.card
    let card = await Card.findById(id)
    if (req?.file || req?.files) {
      if (req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const image = await globalImageUploader(
            req.files[file],
            card._id,
            'card',
          )
          card.images.push(image.Location)
        }

        await card.save()
      } else {
        const image = await globalImageUploader(req.file, card._id, 'card')
        card.images.push(image.Location)
        await card.save()
      }
    }
    return res.status(200).json({ message: 'Image added successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
