'use strict'

const Match = require('../models/match.js')
const MatchStats = require('../models/matchStats.js')

function addMatch(req, res, next) {
  // getting data
  const match = new Match({
    localTeam: req.body.match.localTeam,
    awayTeam: req.body.match.awayTeam,
    localTeamGoals: req.body.match.localTeamGoals,
    awayTeamGoals: req.body.match.awayTeamGoals,
    matchDay: req.body.match.matchDay,
    competition: req.body.match.competition,
    round: req.body.match.round
  })
  console.log("Añadiendo partido...")
  match.save((err, match) => {
    if (err) return res.status(500).send({
      message: `Error al crear competición: ${err}`
    })
    else {
      req.match = match
      req.round = req.body.match.round
      req.localTeamStats = req.body.localTeamStats
      req.awayTeamStats = req.body.awayTeamStats
      next()
    }
  })
}

function addMyMatch(req, res, next) {
  // getting data
  const match = new Match({
    localTeam: req.match.localTeam,
    awayTeam: req.match.awayTeam,
    localTeamGoals: req.match.localTeamGoals,
    awayTeamGoals: req.match.awayTeamGoals,
    matchDay: req.match.matchDay,
    competition: req.match.competition,
    round: req.match.round,
    stats: req.stats,
  })
  console.log("Añadiendo partido...")
  match.save((err, match) => {
    if (err) return res.status(500).send({
      message: `Error al crear competición: ${err}`
    })
    else {
      req.match = match
      req.round = req.body.match.round
      next()
    }
  })
}

module.exports = {
  addMatch,
  addMyMatch
}
