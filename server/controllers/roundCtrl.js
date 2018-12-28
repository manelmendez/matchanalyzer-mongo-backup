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
  Round.findByIdAndUpdate(round,{ "$push": {"matches": match._id}}, function(err, round) {
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
        match: match
      })
    }
  })
}

module.exports = {
  addRound,
  addMatchToRound
}
