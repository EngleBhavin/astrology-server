const Card = require('../controllers/card')
const { checkAdmin } = require('../middlewares/adminmiddleware')
const { authenticateToken } = require('../middlewares/auth')
const { checkCategoryId } = require('../middlewares/horoscope')
const { checkCardId } = require('../middlewares/card')
const router = require('express').Router()

router.post(
  '/create-card',
  [authenticateToken, checkAdmin, checkCategoryId],
  Card.createCard,
)

router.get('/get-card/:id', [authenticateToken, checkCardId], Card.getCard)
router.get('/get-cards', [authenticateToken], Card.getAllCards)
router.post(
  '/get-card-by-cat/:id',
  [authenticateToken, checkCategoryId],
  Card.getCardsWithCatId,
)
router.post(
  '/update-card/:id',
  [authenticateToken, checkAdmin, checkCategoryId, checkCardId],
  Card.updateCard,
)
router.post(
  '/delete-card/:id',
  [authenticateToken, checkAdmin, checkCardId],
  Card.deleteCard,
)

router.post(
  '/add-image/:id',
  [authenticateToken, checkAdmin, checkCardId],
  Card.addImage,
)
module.exports = router
