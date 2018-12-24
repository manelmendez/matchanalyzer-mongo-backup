'use strict'

const Competition = require('../models/competition.js')

function addCompetition(req, res) {
  // getting data
  const competition = new Competition({
    name: req.body.name,
    myTeam: req.body.team,
    teams: [req.body.team],
    season: req.body.season,
    manager: req.body.manager
  })
  console.log("Registrando competicion con nombre: " + competition.name + "...")
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
  Competition.findById(id).populate('teams').populate('myTeam').populate('players').exec((err, competition) => {
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

function getUserCompetitions(req, res) {
  let id = req.params.id
  console.log("Buscando todas las competiciones en la base de datos...");
  Competition.find({manager: id},(err, competitions) => {
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

function addTeamToCompetition(req, res) {
  let competition = req.competition
  let team = req.team
  Competition.findByIdAndUpdate(competition,{ "$push": {"teams": team._id}}, function(err, competition) {
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al insertar equipo en la competición: ${err}`
      })
    }
    if (!competition) {
      return res.status(404).send({
        message: `Error al insertar equipo en la competición: ${err}`
      })
    }
    if (competition) {
      console.log("Equipo añadido a la competición...")
      return res.status(200).send({
        team: team
      })
    }
  })
}

function addRoundToCompetition(req, res) {
  let competition = req.competition
  let round = req.round
  Competition.findByIdAndUpdate(competition,{ "$push": {"rounds": round._id}}, function(err, competition) {
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al insertar jornada en la competición: ${err}`
      })
    }
    if (!competition) {
      return res.status(404).send({
        message: `Error al insertar jornada en la competición: ${err}`
      })
    }
    if (competition) {
      console.log("Jornada añadida a la competición...")
      return res.status(200).send({
        round: round
      })
    }
  })
}

module.exports = {
  addCompetition,
  getCompetition,
  getUserCompetitions,
  addTeamToCompetition,
  addRoundToCompetition
}
