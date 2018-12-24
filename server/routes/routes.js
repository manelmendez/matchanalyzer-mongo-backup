const express = require('express')
const oauth2Ctrl = require('../controllers/oauth2Ctrl')
const userCtrl = require('../controllers/userCtrl')
const teamCtrl = require('../controllers/teamCtrl')
const playerCtrl = require('../controllers/playerCtrl')
const competitionCtrl = require('../controllers/competitionCtrl')
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
api.post('/addNoManagerTeam', auth.checkAuth, teamCtrl.addNoManagerTeam, competitionCtrl.addTeamToCompetition)

// PLAYER
api.post('/addPlayer', auth.checkAuth, playerCtrl.addPlayer, teamCtrl.addPlayerToTeam)
api.get('/getPlayer/:id', auth.checkAuth, playerCtrl.getPlayer)
api.get('/getAllPlayers', auth.checkAuth, playerCtrl.getAllPlayers)

// COMPETITIION
api.post('/addCompetition', auth.checkAuth, competitionCtrl.addCompetition)
api.get('/getCompetition/:id', auth.checkAuth, competitionCtrl.getCompetition)
api.get('/getUserCompetitions/:id', auth.checkAuth, competitionCtrl.getUserCompetitions)

module.exports = api
