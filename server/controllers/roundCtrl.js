'use strict'

const Round = require('../models/round.js')

function addRound(req, res, next) {
  // getting data
  const round = new Round({
    name: req.body.round.name,
    matches: []
  })
  console.log("Registrando competicion con nombre: " + round.name + "...")
  round.save((err, round) => {
    if (err) return res.status(500).send({
      message: `Error al crear competición: ${err}`
    })
    else {
      req.round = round
      req.competition = req.body.competition
      next()
    }
  })
}

// TODO
function addMatchToRound(req, res) {
  let round = req.round
  let match = req.match
  let localTeamStats = req.localTeamStats
  let awayTeamStats = req.awayTeamStats
  Round.findOneAndUpdate({_id:round},{ "$push": {"matches": match._id}}, function(err, round) {
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al insertar partido en la competición: ${err}`
      })
    }
    if (!round) {
      return res.status(404).send({
        message: `Error al insertar partido en la competición: ${err}`
      })
    }
    if (round) {
      console.log("Partido añadido a la competición...")
      return res.status(200).send({
        match: match,
        localTeamStats: localTeamStats,
        awayTeamStats: awayTeamStats
      })
    }
  })
}

function deleteMatchOfRound(req, res, next) {
  // borrar un atributo del array de matchs en round
  // roundId     borrar params.matchId
  Round.updateOne({_id:req.body.roundId}, { $pullAll: {matches: [req.params.id] } } )
  .then((value) => {
    console.log("Paso 4 FINAL - Eliminar partido de lista de partidos de la jornada");
    res.status(200).send({message: `Stats borradas`})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar team stats: ${err}`})
  })
}

function deleteRound(req, res, next) {
  let roundId = req.params.id
  Match.deleteOne({_id:roundId})
  .then((value) => {
    console.log("Paso 1 - Eliminar la jornada de lista de jornadas");
    console.log(value);
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar la jornada: ${err}`})
  })
}

module.exports = {
  addRound,
  addMatchToRound,
  deleteMatchOfRound
}
