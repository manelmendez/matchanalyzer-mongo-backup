'use strict'

const Team = require('../models/team.js')


function addTeam(req, res) {
  // getting data
  const team = new Team({
    name: req.body.name,
    manager: req.body.manager,
    players: [],
    season: req.body.season,
    avatar: req.body.avatar
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
  Team.findById(teamId).populate('players').populate('stats').exec((err, team) => {
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
    avatar: req.body.team.avatar
  })
  console.log(team);
  console.log("Registrando equipo con nombre: " + team.name + "...");

  team.save((err) => {
    if (err) {
      console.log(err)
      return res.status(500).send({
        message: `Error al crear el equipo: ${err}`
      })
    }
    else {
      req.competition = req.body.competition
      req.team = team
      next()
    }
  })
}

function addStatsToTeam(req, res, next) {
  let match = req.match
  let localStats = req.localTeamStats._id
  let awayStats = req.awayTeamStats._id

  Team.findByIdAndUpdate(match.localTeam,{ "$push": {"stats": localStats}}, function(err, stats) {
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al insertar stats al equipo: ${err}`
      })
    }
    if (stats) {
      console.log("Stats local añadidos al equipo...")
      Team.findByIdAndUpdate(match.awayTeam,{ "$push": {"stats": awayStats}}, function(err, stats2) {
        if (err) {
          console.log(`Error: ${err}`)
          return res.status(500).send({
            message: `Error al insertar stats al equipo: ${err}`
          })
        }
        if (stats2) {
          console.log("Stats visitante añadidos al equipo...")
          req.round = req.round
          req.match = req.match
          next()
        }
      })
    }
  })
}

function deleteStatsOfTeam(req, res, next) {
  // borrar un atributo del array de stats en team
  // localteamId    borrar localTeamStatsId
  // awayTeamId    borrar awayTeamStatsId
  // let localStatsId = req.params.localStatsId
  Team.updateOne({_id:req.body.localTeamId}, { $pullAll: {stats: [req.body.localTeamStatsId] } } )
  .then((value) => {
    console.log("Paso 3a - Eliminar stats de lista de stats del equipo local");
    console.log(value);
    Team.updateOne({_id:req.body.awayTeamId}, { $pullAll: {stats: [req.body.awayTeamStatsId] } } )
    .then((value2) => {
      console.log("Paso 3b - Eliminar stats de lista de stats del equipo visitante");
      console.log(value2);
      next()
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({message: `Error al borrar team stats: ${err}`})
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar team stats: ${err}`})
  })

  // Match.deleteOne(localStatsId)
  // .then((value) => {
  //   console.log('Las stats han sido eliminadas')
  // })
  // .catch((err) => {
  //   if (err) res.status(500).send({message: `Error al borrar team stats: ${err}`})
  // })
  // }
}

function updateTeam(req, res) {
  let team = req.body.team
  Team.updateOne({_id:req.params.id}, { $set: {name: team.name, season: team.season, avatar: team.avatar } } )
  .then((value) => {
    res.status(200).send({team: value})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al editar team: ${err}`})
  })
}

module.exports = {
  addTeam,
  getTeam,
  getAllTeams,
  getUserTeams,
  addPlayerToTeam,
  addNoManagerTeam,
  addStatsToTeam,
  deleteStatsOfTeam,
  updateTeam
}
