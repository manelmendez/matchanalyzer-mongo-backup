'use strict'

const Team = require('../models/team.js')

/**
 * Function to sign up a new user in the DB 
 *
 */
function addTeam(req, res) {
  // getting data
  const team = new Team({
    name: req.body.name,
    manager: req.body.manager,
    players: [],
    email: req.body.email
  })
  console.log("Registrando equipo con nombre: " + team.name + "...");
  // check if team exists in database
  Team.findOne({ name: team.name }, function(err, existingTeam) {
    // case if error in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al registrar equipo: ${err}`
      })
    }
    // case if team not exists ==> register
    if (!existingTeam) {
      console.log("No existe ningún equipo con ese nombre, registrando...")
      // saving team in DB
      team.save((err) => {
        if (err) return res.status(500).send({
          message: `Error al crear el equipo: ${err}`
        })
        return res.status(200).send({
          team: team
        })
      })
    }
    // case if user exists ==> RETURN Error
    if (existingTeam) {
      console.log("Este nombre de equipo ya está registrado, no se puede continuar.")
      return res.status(202).send({
        message: `Error. Equipo ya registrado`
      })
    }
  })
}


function getTeam(req, res) {
  let teamId = req.params.id
  console.log("Buscando equipo con id: " + teamId + " en la base de datos...");
  //search team on DB
  Team.findById(teamId, (err, team) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al buscar: ${err}`
      })
    }
    // case if team is not found on DB
    if (!team) {
      console.log("No existe el equipo.")
      return res.status(401).send({
        message: 'No se ha encontrado el equipo'
      })
    }
    // case if team found
    if (team) {
      console.log("Equipo " + team.name + " entontrado.");
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        team: team
      })
    }
  })
}

function getAllTeams(req, res) {
  console.log("Buscando todos los equipos en la base de datos...");
  Team.find({},(err, teams) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
    }
    if (users) {
      console.log("Equipos encontrados.");
      res.status(200).send({
        teams: teams
      })
    }
  })
}

module.exports = {
  addTeam,
  getAllTeams
}
