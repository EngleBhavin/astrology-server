const Horoscope = require('../controllers/horoscope')
const { checkAdmin } = require('../middlewares/adminmiddleware')
const { authenticateToken } = require('../middlewares/auth')
const router = require('express').Router()

router.post(
  '/create-horoscope',
  [authenticateToken, checkAdmin],
  Horoscope.createHoroscope,
)

router.post(
  '/create-horoscope-category',
  [authenticateToken, checkAdmin],
  Horoscope.createHoroscopeCategory,
)

router.get('/get', [authenticateToken], Horoscope.getHoroscope)
router.get('/get-horoscope', [authenticateToken], Horoscope.getAllHoroscope)
router.get('/get/:id', [authenticateToken], Horoscope.getHoroscopeById)
router.get('/get-horoscope-cat/:id', [authenticateToken], Horoscope.getHoroscopeCategoryById)
router.post('/add-image/:id', [authenticateToken,checkAdmin], Horoscope.addImage)
router.get(
  '/get-horoscope-category',
  [authenticateToken],
  Horoscope.getHoroscopeCategory,
)

router.post(
  '/update-horoscope/:id',
  [authenticateToken, checkAdmin],
  Horoscope.updateHoroscope,
)
router.post(
  '/update-horoscope-category/:id',
  [authenticateToken, checkAdmin],
  Horoscope.updateHoroscopeCategory,
)

router.post('/delete-horo-category/:id', [authenticateToken, checkAdmin], Horoscope.deleteHoroscopeCategory);
router.post('/delete-horoscope/:id', [authenticateToken, checkAdmin], Horoscope.deleteHoroscope);
module.exports = router
