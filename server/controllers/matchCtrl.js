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
      match.populate([{path: 'localTeam'},{path: 'awayTeam'}]).execPopulate(function(err2, match2) {
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
  Match.findByIdAndUpdate({_id:id}, {$set:match}, {new:true}).populate([{path: 'localTeam'},{path: 'awayTeam'}])
  .then((value) => {
    console.log("Partido actualizado");
    console.log(value);
    req.match = value
    req.round = req.body.match.round
    req.localTeamStats = req.body.localTeamStats
    req.awayTeamStats = req.body.awayTeamStats
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar el partido: ${err}`})
  })
}

function deleteMatch (req, res, next) {
  let matchId = req.params.id
  Match.deleteOne({_id:matchId})
  .then((value) => {
    console.log("Paso 1 - Eliminar partido de lista de partidos");
    console.log(value);
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar el partido: ${err}`})
  })
}

module.exports = {
  addMatch,
  addMyMatch,
  updateMatch,
  deleteMatch
}
