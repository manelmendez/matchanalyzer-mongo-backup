const Competition = require('../models/competition.js')
const competitionService = require('../dao/competition-service')

function addCompetition(req, res) {
  // getting data
  const competition = new Competition({
    name: req.body.name,
    myTeam: req.body.team,
    teams: [req.body.team],
    season: req.body.season,
    manager: req.body.manager,
    discipline: req.body.discipline,
    category: req.body.category,
    rounds: []
  })
  console.log("Registrando competicion con nombre: " + competition.name + "...")
  // check if competition exists in database
  competitionService.findByName(Competition.name).then((existingCompetition) => {    
    if (existingCompetition) {
      console.log("Este nombre de competición ya está registrado, no se puede continuar.")
      return res.status(409).send({
        message: `Error. Competición ya registrada`
      })
    }
    else {
      console.log("No existe ninguna competicion con ese nombre, creando...")
      // saving competition in DB
      competitionService.saveCompetition(competition).then((competitionSaved) => {
        return res.status(200).send({
          competition: competitionSaved
        })
      }).catch((err) => {
        console.log(err)
        return res.status(500).send({
          message: `Error al crear competición`
        })
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al registrar competicion`
    })
  })
}

function getCompetition(req, res) {
  let id = req.params.id
  console.log("Buscando competición con id: " + id + " en la base de datos...");
  //search competition on DB
  competitionService.findById(id).then((competition => {
    if (competition) {
      console.log("Competición " + competition.name + " entontrada.");
      // send competition
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        competition: competition
      })
    }
    else {
      console.log("No existe la competición.")
      return res.status(401).send({
        message: 'No se ha encontrado la competición'
      })
    }
  })).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function getUserCompetitions(req, res) {
  let id = req.params.id
  console.log("Buscando todas las competiciones en la base de datos...");
  competitionService.findByManager(id).then((competitions) => {
    console.log("Competiciones encontradas.");
    res.status(200).send({
      competitions: competitions
    })
  }).catch((err) => {
    console.log(`Error: ${err}`)
  })
}

function addTeamToCompetition(req, res) {
  let competitionId = req.competition
  let team = req.team
  let query = {_id: competitionId}
  let update = { "$push": {"teams": team._id}}
  let options = {new:true}
  competitionService.updateCompetition(query, update, options).then((competition) => {
    if (competition) {
      console.log("Equipo añadido a la competición...")
      return res.status(200).send({
        team: team
      })
    }
    else {
      return res.status(404).send({
        message: `Error al insertar equipo en la competición: ${err}`
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al insertar equipo en la competición`
    })
  })
}

function addRoundToCompetition(req, res) {
  let competitionId = req.competition
  let round = req.round
  let query = {_id: competitionId}
  let update = { "$push": {"rounds": round._id}}
  let options = {new:true}
  competitionService.updateCompetition(query, update, options).then((competition) => {
    if (competition) {
      console.log("Jornada añadida a la competición...")
      return res.status(200).send({
        round: round
      })
    }
    else {
      return res.status(404).send({
        message: `Error al insertar jornada en la competición: ${err}`
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al insertar jornada en la competición: ${err}`
    })
  })
}
function updateCompetition(req, res) {
  const competition = {
    name: req.body.name,
    myTeam: req.body.team,
    season: req.body.season,
    discipline: req.body.discipline,
    category: req.body.category,
  }
  let query = {_id:req.params.id}
  let update = {$set:competition}
  let options = {new:true}
  competitionService.updateCompetition(query, update, options).then((competitionUpdated) => {    
    competitionUpdated.populate([{
      path:'teams',
      populate: {
        path: 'stats'
      }
    },
    {
      path:'myTeam',
      populate: {
        path:'players'
      }
    },
    {
      path: 'rounds',
      populate: {
        path: 'matches',
        populate: [
          {path: 'localTeam'},
          {path: 'awayTeam'}
        ]
      }
    }])
    .execPopulate(function(err2, value) {
      if (err2) {
        console.log(err2);
        res.status(500).send({message: `Error al actualizar el partido`})
      }    
      else {
        console.log("Partido actualizado");
        res.status(200).send(value)
      }
    })
  }).catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar el partido`})
  })
}
function deleteCompetition(req, res, next) {
  competitionService.deleteCompetition(req.params.id).then((competition) => {
    next()
  }).catch((err) => {
    return res.status(500).send({
      message: `Error al borrar la competición`
    })
  })
}

module.exports = {
  addCompetition,
  getCompetition,
  getUserCompetitions,
  addTeamToCompetition,
  addRoundToCompetition,
  updateCompetition,
  deleteCompetition
}
