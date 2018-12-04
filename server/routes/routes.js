const express = require('express')
const oauth2Ctrl = require('../controllers/oauth2Ctrl')
const userCtrl = require('../controllers/userCtrl')
const teamCtrl = require('../controllers/teamCtrl')
const playerCtrl = require('../controllers/playerCtrl')
const auth = require('../middlewares/auth')
const api = express.Router()

// AUTH
api.post('/private', auth.isAuth)

// OAUTH2
api.get('/oauth/google', oauth2Ctrl.verifyGoogleToken)

// USER
api.post('/signUp', userCtrl.signUp)
api.post('/signIn', userCtrl.signIn)
api.get('/getUser/:id', auth.checkAuth, userCtrl.getUser)
api.get('/getAllUsers', auth.checkAuth, userCtrl.getAllUsers)

// TEAM
api.post('/addTeam', auth.checkAuth, teamCtrl.addTeam)
api.get('/getTeam/:id', auth.checkAuth, teamCtrl.getTeam)
api.get('/getAllTeams', auth.checkAuth, teamCtrl.getAllTeams)
api.get('/getUserTeams/:userId', auth.checkAuth, teamCtrl.getUserTeams)

// PLAYER
api.post('/addPlayer', auth.checkAuth, playerCtrl.addPlayer)
api.get('/getPlayer/:id', auth.checkAuth, playerCtrl.getPlayer)
api.get('/getPlayerByTeamId/:id', auth.checkAuth, playerCtrl.getPlayerByTeamId)
api.get('/getAllPlayers', auth.checkAuth, playerCtrl.getAllPlayers)

module.exports = api
