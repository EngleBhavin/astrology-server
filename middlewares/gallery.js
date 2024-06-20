const Gallery = require('../models/gallery');
const Video = require('../models/videos');

exports.checkFolder = async (req,res,next)=>{
    try {
        const id = req.params.id || req.body.galleryId;
        const gallery = await Gallery.findById(id);
        if(!gallery){
            return res.status(400).json({ message: "Folder not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

exports.checkValidvideo = async (req,res,next)=>{
    try {
        const id = req.params.id || req.body.videoId;
           const video = await Video.findById(id);
        if(!video){
            return res.status(400).json({ message: "Video not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}