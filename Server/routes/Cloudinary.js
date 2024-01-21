const express = require('express')
const routes = express.Router()

// controllers

const {
    list,
    createImage,
    read,
    update,
    removeImage
} = require('../controllers/Cloudinary')
const { auth, adminCheck } = require('../Middleware/auth')

routes.post('/images', auth, adminCheck, createImage)
routes.post('/removeimages', auth, adminCheck, removeImage)


module.exports = routes;