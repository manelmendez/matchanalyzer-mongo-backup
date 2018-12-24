'use strict'

const Round = require('../models/round.js')

function addRound(req, res) {
  // getting data
  const round = new Round({
    name: req.body.round.name,
  })
  console.log("Registrando competicion con nombre: " + round.name + "...")
  // check if round exists in database
  Round.findOne({ name: round.name }, function(err, existingRound) {
    // case if error in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al registrar competicion: ${err}`
      })
    }
    // case if round not exists ==> register
    if (!existingRound) {
      console.log("No existe ninguna competicion con ese nombre, creando...")
      // saving round in DB
      round.save((err) => {
        if (err) return res.status(500).send({
          message: `Error al crear competición: ${err}`
        })
        return res.status(200).send({
          round: round
        })
      })
    }
    // case if round exists ==> RETURN Error
    if (existingRound) {
      console.log("Este nombre de competición ya está registrado, no se puede continuar.")
      return res.status(202).send({
        message: `Error. Competición ya registrada`
      })
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
