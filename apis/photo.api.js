const { uploadImg } = require('../common/uploadImg')
const { addPhoto, up, down, getPhotos } = require('../services/photo.service')


const app = require('express').Router()

app.post('/',uploadImg('path'),addPhoto)
app.post('/up',up)
app.post('/down',down)
app.get('/',getPhotos)



module.exports=app