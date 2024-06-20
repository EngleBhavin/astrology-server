const { S3 } = require('aws-sdk') // Software development kit (sdk)
const uuid = require('uuid').v4

exports.uploadFile = async (file, user) => {
  try {
    let s3 = new S3({
      accessKeyId: process.env.AWS_KEY, // process.env.ACCESS
      secretAccessKey: process.env.AWS_SECRET,
    })
    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `profiles/${user}/${uuid()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
    }
    return s3.upload(params).promise()
  } catch (err) {
    console.log(err.message)
  }
}

exports.horoscopeUpload = async (file, id) => {
  try {
    let s3 = new S3({
      accessKeyId: process.env.AWS_KEY, // process.env.ACCESS
      secretAccessKey: process.env.AWS_SECRET,
    })
    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `horoscope/${id}/${uuid()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
    }
    return s3.upload(params).promise()
  } catch (err) {
    console.log(err.message)
  }
}

// Image UPloader
exports.imageUpload = async (file, id) => {
  try {
    let s3 = new S3({
      accessKeyId: process.env.AWS_KEY, // process.env.ACCESS
      secretAccessKey: process.env.AWS_SECRET,
    })
    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `images/${id}/${uuid()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
    }
    return s3.upload(params).promise()
  } catch (err) {
    console.log(err.message)
  }
}

exports.globalImageUploader = async (file, id, path) => {
  try {
    let s3 = new S3({
      accessKeyId: process.env.AWS_KEY, // process.env.ACCESS
      secretAccessKey: process.env.AWS_SECRET,
    })
    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${path}/${id}/${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
    }
    return s3.upload(params).promise()
  } catch (error) {
    console.error(error)
  }
}
