const Round = require('../models/round.js')
const roundService = require('../dao/round-service')

function addRound(req, res, next) {
  // getting data
  const round = new Round({
    name: req.body.round.name,
    matches: []
  })
  console.log("Registrando competicion con nombre: " + round.name + "...")
  roundService.saveRound(round).then((roundSaved) => {
    req.round = roundSaved
    req.competition = req.body.competition
    next()
  }).catch((err) => {
    console.log(err);
    return res.status(500).send({
      message: `Error al crear competición`
    })
  })
}

// TODO
function addMatchToRound(req, res) {
  let round = req.round
  let match = req.match
  let localTeamStats = req.localTeamStats
  let awayTeamStats = req.awayTeamStats
  let query   = {_id:round}; 
  let update  = { "$push": {"matches": match._id}}
  let options = { new: true }; 
  roundService.updateRound(query, update, options).then((round) => {
    if (round) {
      console.log("Partido añadido a la competición...")
      return res.status(200).send({
        match: match,
        localTeamStats: localTeamStats,
        awayTeamStats: awayTeamStats
      })
    }
    else {
      return res.status(404).send({
        message: `Error al insertar partido en la competición: ${err}`
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al insertar partido en la competición: ${err}`
    })
  })
}

function deleteMatchOfRound(req, res, next) {
  // borrar un atributo del array de matchs en round
  // roundId     borrar params.matchId
  let query   = {_id:req.body.roundId} 
  let update  = { $pullAll: {matches: [req.params.id] } }
  let options = { new: true }; 
  roundService.updateRound(query, update, options).then((round) => {
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
  let query = {_id:roundId}
  roundService.deleteRound(query)
  .then((round) => {
    console.log(round);
    res.status(200).send({message: `Jornada borrada`})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar la jornada: ${err}`})
  })
}

function deleteCompetitionRounds(req, res, next) {
  let competitionId = req.params.id
  let query = {competition:competitionId}
  roundService.deleteCompetitionRounds(query)
  .then((round) => {
    console.log(round);
    res.status(200).send({message: `Jornada borrada`})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar la jornada: ${err}`})
  })
}

module.exports = {
  addRound,
  addMatchToRound,
  deleteMatchOfRound,
  deleteRound,
  deleteCompetitionRounds
}
