const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const multer  = require('multer')
app.use(express.json())


app.use('/photos',require('./apis/photo.api'))
app.use('/users',require('./apis/user.api'))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

mongoose.connect("mongodb://localhost:27017/photoApp");