const Gallery = require('../controllers/gallery')
const { authenticateToken } = require('../middlewares/auth')
const { checkAdmin } = require('../middlewares/adminmiddleware')
const { checkFolder, checkValidvideo } = require('../middlewares/gallery')
const { checkValidSubscription } = require('../middlewares/subscription')
const { checkUser } = require('../middlewares/user')
const router = require('express').Router()

router.post('/create', [authenticateToken, checkAdmin], Gallery.addFolder)
router.get('/get', [authenticateToken], Gallery.getFolders)
router.get('/get/:id', [authenticateToken, checkFolder], Gallery.getFolder)

router.post(
  '/update/:id',
  [authenticateToken, checkAdmin, checkFolder],
  Gallery.updateFolder,
)
router.post(
  '/delete/:id',
  [authenticateToken, checkAdmin, checkFolder],
  Gallery.deleteFolder,
)
router.post(
  '/add-video/:id',
  [authenticateToken, checkAdmin, checkFolder],
  Gallery.addVideo,
)
router.post(
  '/delete-video/:id',
  [authenticateToken, checkAdmin, checkValidvideo],
  Gallery.deleteVideo,
)
router.post(
  '/update-video/:id',
  [authenticateToken, checkAdmin, checkValidvideo],
  Gallery.updateVideo,
)

router.get(
  '/get-videos/:id',
  [authenticateToken, checkUser, checkFolder, checkValidSubscription],
  Gallery.getVideos,
)
router.get(
  '/get-video/:id',
  [authenticateToken, checkValidvideo, checkValidSubscription],
  Gallery.getVideo,
)
router.get(
  '/get-all-videos',
  [authenticateToken, checkAdmin],
  Gallery.getAllVideos,
)
module.exports = router
