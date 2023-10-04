const { signup } = require('../services/user.service')


const app = require('express').Router()

app.post('/',signup)


module.exports=app