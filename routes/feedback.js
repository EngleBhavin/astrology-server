const Feedback = require('../controllers/feedback')
const Faq = require('../controllers/faq')
const newFeature = require('../controllers/newFeature')
const { authenticateToken } = require('../middlewares/auth')
const {
  sendGetInTouchMessage,
  createGetInTouch,
  updateGetInTouch,
  getDataOfGetInTouch,
  getMessagesOfGetInTouch,
} = require('../controllers/getInTouch')
const { checkAdmin } = require('../middlewares/adminmiddleware')
const router = require('express').Router()

router.post(
  '/create-feedback',
  [authenticateToken, checkAdmin],
  Feedback.createFeedback,
)
router.post('/give-feedback/:id', [authenticateToken], Feedback.updateFeedback)
router.get('/get-all-feedback-ques', [authenticateToken], Feedback.getFeedbacks)

// Faqs

router.post('/create-faqs', [authenticateToken, checkAdmin], Faq.createFaq)
router.get('/get-all-faqs', [authenticateToken], Faq.getFaqs)
router.post('/update/:id', [authenticateToken, checkAdmin], Faq.updateFaq)
router.get('/get-faq/:id', [authenticateToken], Faq.getFaq)

// upcoming features
router.post(
  '/create-feature',
  [authenticateToken, checkAdmin],
  newFeature.createFeature,
)
router.post(
  '/update-new-feature/:id',
  [authenticateToken, checkAdmin],
  newFeature.updateFeature,
)
router.get('/new-features', [authenticateToken], newFeature.getFeatures)

// About Us
router.get('/about-us', [authenticateToken], newFeature.getAboutUs)
router.post(
  '/create-about-us',
  [authenticateToken, checkAdmin],
  newFeature.addAboutUs,
)
router.post(
  '/update-about-us/:id',
  [authenticateToken, checkAdmin],
  newFeature.updateAboutUs,
)

// Get In Touch
router.post(
  '/create-get-in-touch',
  [authenticateToken, checkAdmin],
  createGetInTouch,
)
router.post('/send-message', [authenticateToken], sendGetInTouchMessage)
router.get('/get-in-touch', [authenticateToken], getDataOfGetInTouch)
router.get(
  '/get-messages',
  [authenticateToken, checkAdmin],
  getMessagesOfGetInTouch,
)

module.exports = router
