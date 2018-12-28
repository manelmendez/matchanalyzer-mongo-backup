'use strict'

const TeamStats = require('../models/teamStats.js')
const MatchStats = require('../models/matchStats.js')

function addTeamStats(req, res, next) {
  const localTeamStats = new TeamStats({
    ...req.localTeamStats,
  })
  const awayTeamStats = new TeamStats({
    ...req.awayTeamStats,
  })
  console.log("Guardando stats...")
  localTeamStats.save((err, stats) => {
    if (err) return res.status(500).send({
      message: `Error al guardar local stats: ${err}`
    })
    else {
      console.log("Local stats guardadas");
      awayTeamStats.save((err, stats2) => {
        if (err) return res.status(500).send({
          message: `Error al guardar away stats: ${err}`
        })
        else {
          console.log("Away stats guardadas");
          req.match = req.match
          req.round = req.round
          req.localTeamStats = stats
          req.awayTeamStats = stats2
          next()
        }
      })
    }
  })
}

module.exports = {
  addTeamStats,
}
