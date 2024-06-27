const Gallery = require('../models/gallery')
const Video = require('../models/videos')
const { globalImageUploader } = require('../global/fileUploader')
// const {
//   sessionStarter,
//   sessionAborter,
//   sessionCommiter,
//   sessionEnder,
// } = require('../services/transactions')

exports.addFolder = async (req, res) => {
  // const session = await sessionStarter(Gallery)
  let { title, description } = req.body
  try {
    let gallery = await Gallery.findOne({ title: title })
    if (gallery) {
      return res.status(400).json({ message: 'Folder already exists' })
    }
    gallery = new Gallery({
      title,
      description,
    })
    if (req.file || req.files) {
      if (req.files && req.files.length > 0) {
       for(let file = 0; file < req.files.length; file++){
          const imageData = await globalImageUploader(
            req.files[file],
            gallery._id,
            'gallery',
          )
          gallery.image = imageData.Location
        }
        await gallery.save()
        // await gallery.save({session})
      } else {
        if (req.file) {
          const imageData = await globalImageUploader(
            req.file,
            gallery._id,
            'gallery',
          )
          gallery.image = imageData.Location
          await gallery.save()
          // await gallery.save({session})
        }
      }
    }
    // await gallery.save({session})
    await gallery.save()
    // await sessionCommiter(session)
    return res.status(200).json({ message: 'Folder created successfully' })
  } catch (error) {
    console.error(error)
    // await sessionAborter(session)
    return res.status(500).json({ message: error.message })

  }
  // await sessionEnder(session)
}

exports.updateFolder = async (req, res) => {
  let { title, description } = req.body
  try {
    let gallery = await Gallery.findById(req.params.id)
    gallery.title = title ? title : gallery.title
    gallery.description = description ? description : gallery.description
    if (req.file || req.files) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const imageData = await globalImageUploader(
            req.files[file],
            gallery._id,
            'gallery',
          )
          gallery.image = imageData.Location
        }
        await gallery.save()
      } else {
        if (req.file) {
          const imageData = await globalImageUploader(
            req.file,
            gallery._id,
            'gallery',
          )
          gallery.image = imageData.Location
        }
      }
      await gallery.save()
    }
    await gallery.save()
    return res.status(200).json({ message: 'Folder updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getFolders = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isDeleted: false })
    return res.status(200).json({ gallery })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
exports.getFolder = async (req, res) => {
  try {
    let gallery = await Gallery.findOne({
      _id: req.params.id,
      isDeleted: false,
    })
    if (!gallery) return res.status(404).json({ message: 'Folder not found' })
    return res.status(200).json({ gallery })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }

}

exports.deleteFolder = async (req, res) => {
  try {
    
    let gallery = await Gallery.findById(req.params.id)
    // check videos 
    let videos = await Video.find({ gallery: gallery._id })
    if(videos.length> 0){
      return res.status(400).json({ message: 'Folder contains videos' })
    }
    gallery.isDeleted = true
    gallery.deletedAt = Date.now()
    await gallery.save()
    return res.status(200).json({ message: 'Folder deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.addVideo = async (req, res) => {
  let { title, description, link } = req.body
  try {
    let video = new Video({
      title,
      description,
      link,
      gallery: req.params.id,
    })
    let checkGallery = await Gallery.findById(req.params.id)
    if (req.file || req.files) {
      if (req.files && req.files.length > 0) {
        for (let file = 0; file < req.files.length; file++) {
          const videosData = await globalImageUploader(
            file,
            video._id,
            'videos',
          )
          video.video = videosData.Location
        }
        await video.save()
      } else {
        if (req.file) {
          const videosData = await globalImageUploader(
            req.file,
            video._id,
            'videos',
          )
          video.video = videosData.Location
          await video.save()
        }
      }
    }
    await video.save()
    checkGallery.videoCount = checkGallery.videoCount + 1
    await checkGallery.save()
    return res.status(200).json({ message: 'Video added successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.updateVideo = async (req, res) => {
  console.log(req.body)
  let { title, description, link } = req.body
  try {
    let video = await Video.findById(req.params.id)
    video.title = title ? title : video.title
    video.description = description ? description : video.description
    video.link = link ? link : video.link
    if (req.file || req.files) {
      if (req.files && req.files.length > 0) {
        req.files.forEach(async (file) => {
          const image = await globalImageUploader(file, video._id, 'videos')
          video.video = image.Location
        })
        await video.save()
      } else {
        if (req.file) {
          const image = await globalImageUploader(req.file, video._id, 'videos')
          video.video = image.Location
          await video.save()
        }
      }
    }
    await video.save()
    return res.status(200).json({ message: 'Video updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getVideos = async (req, res) => {
  try {
    let video = await Video.find({
      isDeleted: false,

      gallery: req.body.galleryId || req.params.id,
      $or: [
        {
          link: { $ne: null, $exists: true },
          link: { $ne: '' },
        },
        {
          video: { $ne: null, $exists: true },
          video: { $ne: '' },
        },
      ],
    })
    return res.status(200).json({ video })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
exports.getVideo = async (req, res) => {
  try {
    let video = await Video.findOne({
      _id: req.params.id,
      isDeleted: false,
    })
    if (!video) return res.status(404).json({ message: 'Video not found' })
    video.views = video.views ? +video.views + 1 : 1
    await video.save()
    return res.status(200).json({ video })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
exports.deleteVideo = async (req, res) => {
  try {
    let video = await Video.findById(req.params.id)
    video.isDeleted = true
    video.deletedAt = Date.now()
    await video.save()
    return res.status(200).json({ message: 'Video deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}


exports.getAllVideos = async (req, res) => {
  try {
    console.log('here')
    const videos = await Video.find({ isDeleted: false }).populate([
      {
        path: 'gallery',
      },
    ])
    return res.status(200).json({ videos })
  }
  catch(error){
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}