const express = require('express')
const oauth2Ctrl = require('../controllers/oauth2Ctrl')
const auth = require('../middlewares/auth')
const api = express.Router()

// AUTH
api.post('/private', auth.isAuth)

// OAUTH2
api.get('/oauth/google', oauth2Ctrl.verifyGoogleToken)

module.exports = api
