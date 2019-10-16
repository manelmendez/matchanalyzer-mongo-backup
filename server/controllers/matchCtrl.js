'use strict'

const Match = require('../models/match.js')
const matchService = require('../dao/match-service')

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
  matchService.saveMatch(match).then((matchSaved) => {
    matchSaved.populate([{path: 'localTeam'},{path: 'awayTeam'}]).execPopulate(function(err2, match2) {
      if(err2){
        return res.status(500).send({
          message: `Error al crear competición: ${err2}`
        })
      }
      else{
        req.match = match2
        req.round = req.body.match.round
        req.localTeamStats = req.body.localTeamStats
        req.awayTeamStats = req.body.awayTeamStats
        next()
      }
    })
  }).catch((err) => {
    return res.status(500).send({
      message: `Error al crear competición: ${err}`
    })
  })
}

function updateMatch (req, res, next) {
  let id = req.params.id
  //no se hace const match = new Match porque eso te genera una nueva _id y por tanto no te deja editar
  const match = {
    localTeam: req.body.match.localTeam,
    awayTeam: req.body.match.awayTeam,
    localTeamGoals: req.body.match.localTeamGoals,
    awayTeamGoals: req.body.match.awayTeamGoals,
    matchDay: req.body.match.matchDay,
    competition: req.body.match.competition,
    round: req.body.match.round
  }
  console.log("Actualizar partido");
  // Match.updateOne({_id:id}, {$set:match})    LA FUNCION UPDATEONE() NO DEVUELVE EL DOC EDITADO
  let query = {_id:id}
  let update = {$set:match}
  let options = {new:true}
  matchService.updateMatch(query, update, options).then((matchUpdated) => {    
    matchUpdated.populate([{path: 'localTeam'},{path: 'awayTeam'}]).execPopulate(function(err2, value) {
      if (err2) {
        console.log(err2);
        res.status(500).send({message: `Error al actualizar el partido`})
      }    
      else {
        console.log("Partido actualizado");
        req.match = value
        req.round = req.body.match.round
        req.localTeamStats = req.body.localTeamStats
        req.awayTeamStats = req.body.awayTeamStats
        next()
      }
    })
  }).catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar el partido`})
  })
}

function deleteMatch (req, res, next) {
  let matchId = req.params.id
  matchService.deleteMatch(matchId)
  .then((value) => {
    console.log("Paso 1 - Eliminar partido de lista de partidos");
    console.log(value);
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar el partido`})
  })
}

module.exports = {
  addMatch,
  updateMatch,
  deleteMatch
}
