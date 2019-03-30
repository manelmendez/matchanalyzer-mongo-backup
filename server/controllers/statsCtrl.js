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

function updateTeamStats (req, res) {
  let localTeamStats = req.localTeamStats
  let awayTeamStats = req.awayTeamStats
  const localId= req.localTeamStats._id
  const awayId= req.awayTeamStats._id


  delete localTeamStats._id;
  delete awayTeamStats._id;

  console.log(localId);
  console.log(awayId);
  console.log("Actualizar stats...")
  // para los dos equipos, 2 parametros? 2 peticiones?
  TeamStats.findOneAndUpdate({_id: localId}, {$set:localTeamStats}, {new:true})
  .then((value) => {
    console.log(value);
    TeamStats.findOneAndUpdate({_id: awayId}, {$set:awayTeamStats}, {new:true})
    .then((value2) => {
      console.log(value2);
      let data = {
        match: req.match,
        localTeamStats: value,
        awayTeamStats: value2
      }
      res.status(200).send(data)
    })
    .catch((err2) => {
      console.log(err2);
      res.status(500).send({message: `Error al actualizar team stats: ${err2}`})
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar team stats: ${err}`})
  })
}

function deleteTeamStats (req, res, next) {
  TeamStats.deleteMany({_id:[req.body.localTeamStatsId,req.body.awayTeamStatsId]})
  .then((value) => {
    console.log("Paso 2 - Eliminar stats de lista de teamStats");
    console.log(value);
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar team stats: ${err}`})
  })
}

module.exports = {
  addTeamStats,
  updateTeamStats,
  deleteTeamStats
}
