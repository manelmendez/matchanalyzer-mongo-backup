'use strict'

const Team = require('../models/team.js')


function addTeam(req, res) {
  // getting data
  const team = new Team({
    name: req.body.name,
    manager: req.body.manager,
    players: [],
    season: req.body.temporada,
    stats: {
      points: 0,
      homePoints: 0,
      awayPoints: 0,
      wins: 0,
      homeWins: 0,
      awayWins: 0,
      draws: 0,
      homeDraws: 0,
      awayDraws: 0,
      loses: 0,
      homeLoses: 0,
      awayLoses: 0,
      goals: 0,
      homeGoals: 0,
      awayGoals: 0,
      againstGoals: 0,
      homeAgainstGoals: 0,
      awayAgainstGoals: 0
    }
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
  Team.findById(teamId).populate('players').exec((err, team) => {
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
    if (teams) {
      console.log("Equipos encontrados.");
      res.status(200).send({
        teams: teams
      })
    }
  })
}

function getUserTeams(req, res) {
  let userId = req.params.userId
  console.log("Buscando equipos del usuario " + userId + "en la base de datos..." );
  //search team on DB
  Team.find({ manager: userId }, (err, teams) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al buscar: ${err}`
      })
    }
    // case if team is not found on DB
    if (!teams) {
      console.log("No existen equipos.")
      return res.status(401).send({
        message: 'No se han encontrado equipos'
      })
    }
    // case if team found
    if (teams) {
      console.log("Equipos de " + userId + " entontrados.");
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        teams: teams
      })
    }
  })
}

function addPlayerToTeam(req, res) {
  let player = req.player
  Team.findByIdAndUpdate(player.team,{ "$push": {"players": player._id}}, function(err, team) {
    // case if error in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al insertar usuario al equipo: ${err}`
      })
    }
    // case if team not exists ==> register
    if (!team) {
      return res.status(404).send({
        message: `Error al insertar usuario al equipo: ${err}`
      })
    }
    // case if user exists ==> RETURN Error
    if (team) {
      console.log("Jugador añadido al equipo...")
      return res.status(200).send(
        player
      )
    }
  })
}

function addNoManagerTeam(req, res, next) {
  const team = new Team({
    name: req.body.team.name,
    players: [],
    season: req.body.team.temporada,
    stats: {
      points: 0,
      homePoints: 0,
      awayPoints: 0,
      wins: 0,
      homeWins: 0,
      awayWins: 0,
      draws: 0,
      homeDraws: 0,
      awayDraws: 0,
      loses: 0,
      homeLoses: 0,
      awayLoses: 0,
      goals: 0,
      homeGoals: 0,
      awayGoals: 0,
      againstGoals: 0,
      homeAgainstGoals: 0,
      awayAgainstGoals: 0
    }
  })
  console.log("Registrando equipo con nombre: " + team.name + "...");

  team.save((err) => {
    if (err) return res.status(500).send({
      message: `Error al crear el equipo: ${err}`
    })
    else {
      req.competition = req.body.competition
      req.team = team
      next()
    }
  })
}
module.exports = {
  addTeam,
  getTeam,
  getAllTeams,
  getUserTeams,
  addPlayerToTeam,
  addNoManagerTeam
}
