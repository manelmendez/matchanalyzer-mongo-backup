'use strict'

const Competition = require('../models/competition.js')

function addCompetition(req, res) {
  // getting data
  const competition = new Competition({
    name: req.body.name,
    myTeam: req.body.team,
    season: req.body.season
  })
  console.log("Registrando competicion con nombre: " + competition.name + "...");
  // check if competition exists in database
  Competition.findOne({ name: competition.name }, function(err, existingCompetition) {
    // case if error in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al registrar competicion: ${err}`
      })
    }
    // case if competition not exists ==> register
    if (!existingCompetition) {
      console.log("No existe ninguna competicion con ese nombre, creando...")
      // saving competition in DB
      competition.save((err) => {
        if (err) return res.status(500).send({
          message: `Error al crear competición: ${err}`
        })
        return res.status(200).send({
          competition: competition
        })
      })
    }
    // case if competition exists ==> RETURN Error
    if (existingCompetition) {
      console.log("Este nombre de competición ya está registrado, no se puede continuar.")
      return res.status(202).send({
        message: `Error. Competición ya registrada`
      })
    }
  })
}

function getCompetition(req, res) {
  let id = req.params.id
  console.log("Buscando competición con id: " + id + " en la base de datos...");
  //search competition on DB
  Competition.findById(id, (err, competition) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al buscar: ${err}`
      })
    }
    // case if competition is not found on DB
    if (!competition) {
      console.log("No existe la competición.")
      return res.status(401).send({
        message: 'No se ha encontrado la competición'
      })
    }
    // case if competition found
    if (competition) {
      console.log("Competición " + competition.name + " entontrada.");
      // send competition
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        competition: competition
      })
    }
  })
}

function getAllCompetitions(req, res) {
  console.log("Buscando todas las competiciones en la base de datos...");
  Competition.find({},(err, competitions) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
    }
    if (competitions) {
      console.log("Competiciones encontradas.");
      res.status(200).send({
        competitions: competitions
      })
    }
  })
}

module.exports = {
  addCompetition,
  getCompetition,
  getAllCompetitions
}
