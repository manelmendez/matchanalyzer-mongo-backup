const express = require('express')
const oauth2Ctrl = require('../controllers/oauth2Ctrl')
const userCtrl = require('../controllers/userCtrl')
const teamCtrl = require('../controllers/teamCtrl')
const playerCtrl = require('../controllers/playerCtrl')
const competitionCtrl = require('../controllers/competitionCtrl')
const roundCtrl = require('../controllers/roundCtrl')
const matchCtrl = require('../controllers/matchCtrl')
const teamStatsCtrl = require('../controllers/teamStatsCtrl')
const imageServices = require('../services/image-services')
const auth = require('../middlewares/auth')
const api = express.Router()

// AUTH
api.post('/private', auth.isAuth)

// OAUTH2
api.get('/oauth/google', oauth2Ctrl.verifyGoogleToken)

// IMAGES
api.post('/uploadImage', imageServices.uploadImage)

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
api.put('/updateTeam/:id', auth.checkAuth, teamCtrl.updateTeam)
api.delete('/deleteTeam/:id', auth.checkAuth, teamCtrl.deleteTeam) // PENSAR EN SI BORRAR O NO LAS ESTADISTICAS DEL EQUIPO

// PLAYER
api.post('/addPlayer', auth.checkAuth, playerCtrl.addPlayer, teamCtrl.addPlayerToTeam)
api.get('/getPlayer/:id', auth.checkAuth, playerCtrl.getPlayer)
api.get('/getAllPlayers', auth.checkAuth, playerCtrl.getAllPlayers)
api.put('/updatePlayer/:id', auth.checkAuth, playerCtrl.updatePlayer)
api.delete('/deletePlayer/:id', auth.checkAuth, playerCtrl.deletePlayer, teamCtrl.deletePlayerOfTeam)

// COMPETITIION
api.post('/addCompetition', auth.checkAuth, competitionCtrl.addCompetition)
api.get('/getCompetition/:id', auth.checkAuth, competitionCtrl.getCompetition)
api.get('/getUserCompetitions/:id', auth.checkAuth, competitionCtrl.getUserCompetitions)

// ROUND
api.post('/addRound', auth.checkAuth, roundCtrl.addRound, competitionCtrl.addRoundToCompetition)
api.delete('/deleteRound/:id', auth.checkAuth, teamStatsCtrl.deleteAllTeamStatsOfRound, teamCtrl.deleteStatsOfRoundTeams, roundCtrl.deleteRound)

// MATCH
api.post('/addMatch', auth.checkAuth, matchCtrl.addMatch, teamStatsCtrl.addTeamStats, teamCtrl.addStatsToTeam, roundCtrl.addMatchToRound)
api.put('/updateMatch/:id', auth.checkAuth, matchCtrl.updateMatch, teamStatsCtrl.updateTeamStats)
api.delete('/deleteMatch/:id', auth.checkAuth, matchCtrl.deleteMatch, teamStatsCtrl.deleteMatchTeamStats, teamCtrl.deleteStatsOfTeam, roundCtrl.deleteMatchOfRound)

module.exports = api
