const express = require('express')
const oauth2Ctrl = require('../controllers/oauth2Ctrl')
const userCtrl = require('../controllers/userCtrl')
const teamCtrl = require('../controllers/teamCtrl')
const auth = require('../middlewares/auth')
const api = express.Router()

// AUTH
api.post('/private', auth.isAuth)

// OAUTH2
api.get('/oauth/google', oauth2Ctrl.verifyGoogleToken)

// USER
api.post('/signUp', userCtrl.signUp)
api.post('/signIn', userCtrl.signIn)
api.get('/getUser/:id', userCtrl.getUser)
api.get('/getAllUsers', userCtrl.getAllUsers)

// TEAM
api.post('/addTeam', teamCtrl.addTeam)
api.get('/getTeam/:id', teamCtrl.getTeam)
api.get('/getAllTeams', teamCtrl.getAllTeams)

module.exports = api
