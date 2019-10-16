const Team = require('../models/team.js')
const competitionService = require('../dao/competition-service')
const teamService = require('../dao/team-service')

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
  console.log(team);
  
  teamService.findByName(team.name).then((existingTeam) => {
    if(existingTeam) {
      console.log("Este nombre de equipo ya está registrado, no se puede continuar.")
      return res.status(202).send({
        message: `Error. Equipo ya registrado`
      })
    }
    else {
      console.log("No existe ningún equipo con ese nombre, registrando...")
      // saving team in DB
      teamService.saveTeam(team).then((teamSaved) => {
        return res.status(200).send({
          team: teamSaved
        })
      }).catch((err) => {
        console.log(err);
        return res.status(500).send({
          message: `Error al crear el equipo`
        })
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al registrar equipo`
    })
  })
}

function addNoManagerTeam(req, res, next) {  
  const team = new Team({
    name: req.body.team.name,
    players: [],
    season: req.body.team.season,
    avatar: req.body.team.avatar
  })
  console.log("Registrando equipo con nombre: " + team.name + "...");
  
  teamService.findByName(team.name).then((existingTeam) => {
    if(existingTeam) {
      console.log("Este nombre de equipo ya está registrado, no se puede continuar.")
      return res.status(202).send({
        message: `Error. Equipo ya registrado`
      })
    }
    else {
      console.log("No existe ningún equipo con ese nombre, registrando...")
      // saving team in DB
      teamService.saveTeam(team).then((teamSaved) => {
        req.competition = req.body.competition
        req.team = teamSaved
        next()
      }).catch((err) => {
        console.log(err);
        return res.status(500).send({
          message: `Error al crear el equipo`
        })
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al registrar equipo`
    })
  })
}


function getTeam(req, res) {
  let teamId = req.params.id
  console.log("Buscando equipo con id: " + teamId + " en la base de datos...");
  //search team on DB
  teamService.findById(teamId).then((team) => {
    if (team) {
      console.log("Equipo " + team.name + " entontrado.");
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        team: team
      })
    } 
    else {
      console.log("No existe el equipo.")
      return res.status(401).send({
        message: 'No se ha encontrado el equipo'
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function getAllTeams(req, res) {
  console.log("Buscando todos los equipos en la base de datos...");
  teamService.findAll().then((teams) => {
    console.log("Equipos encontrados.");
    res.status(200).send({
      teams: teams
    })
  }).catch((err) => {
    console.log(`Error: ${err}`)
  })
}

function getUserTeams(req, res) {
  let userId = req.params.userId
  console.log("Buscando equipos del usuario " + userId + "en la base de datos..." );
  //search team on DB
  teamService.findByManager(userId).then((teams) => {
    if (teams) {
      console.log("Equipos de " + userId + " entontrados.");
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        teams: teams
      })
    }
    else {
      console.log("No existen equipos.")
      return res.status(401).send({
        message: 'No se han encontrado equipos'
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function addPlayerToTeam(req, res) {
  let player = req.player
  teamService.findTeamByIdAndUpdatePlayer(player.team, player._id).then((team) => {
    if (team) {
      console.log("Jugador añadido al equipo...")
      return res.status(200).send(
        player
      )
    }
    else {
      return res.status(404).send({
        message: `Error al insertar usuario al equipo`
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al insertar usuario al equipo`
    })
  })
}



function addStatsToTeam(req, res, next) {
  let match = req.match
  let localStats = req.localTeamStats._id
  let awayStats = req.awayTeamStats._id

  teamService.findTeamByIdAndUpdateStats(match.localTeam._id, localStats).then((stats) => {
    console.log("Stats local añadidos al equipo...")
    teamService.findTeamByIdAndUpdateStats(match.awayTeam._id, awayStats).then((stats2)=>{
      console.log("Stats visitante añadidos al equipo...")
      next()
    }).catch((err2)=>{
      console.log(`Error: ${err2}`)
      return res.status(500).send({
        message: `Error al insertar stats al equipo`
      })
    })
  }).catch((err)=>{
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al insertar stats al equipo`
    })
  })
}

function deleteStatsOfTeam(req, res, next) {
  // borrar un atributo del array de stats en team
  // localteamId    borrar localTeamStatsId
  // awayTeamId    borrar awayTeamStatsId
  // let localStatsId = req.params.localStatsId
  
  teamService.findTeamByIdAndDeleteStats(req.body.localTeamId, [req.body.localTeamStatsId])
  .then((value) => {
    console.log("Paso 3a - Eliminar stats de lista de stats del equipo local");
    console.log(value);
    teamService.findTeamByIdAndDeleteStats(req.body.awayTeamId, [req.body.awayTeamStatsId])
    .then((value2) => {
      console.log("Paso 3b - Eliminar stats de lista de stats del equipo visitante");
      console.log(value2);
      next()
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({message: `Error al borrar team stats`})
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar team stats`})
  })
}

function deletePlayerOfTeam(req, res) {
  let player = req.player
  teamService.findTeamByIdAndDeletePlayer(player.team, player._id)
  .then((value) => {
    res.status(200).send({player: value})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar team player`})
  })
}

function deleteStatsOfRoundTeams(req, res, next) {
  let teamStatsIds = []
  for (let i = 0; i < req.deletedTeamStats.length; i++) {
    teamStatsIds.push(req.deletedTeamStats[i]._id)
  }
  teamService.findManyTeamsAndDeleteLastStats(teamStatsIds)
  .then((value) => {
    console.log("Eliminar stats de lista de stats de los equipos");
    console.log(value);
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar team stats`})
  })
}

function updateTeam(req, res) {
  let team = req.body.team
  teamService.updateTeam(req.params.id, team)
  .then((value) => {
    res.status(200).send({team: value})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al editar team`})
  })
}

function deleteTeam (req, res) {
  let teamId = req.params.id
  // check if this team is in a competition
  competitionService.findAll().then((competitions) => {
    let found = false
    if (competitions) {
      let i = 0
      while (!found && i < competitions.length) {
        if (competitions[i].myTeam == teamId) {
          if (competitions[i].rounds.length!=0) {
            found = true
          }
        }
        i++
      }
    }
    if (!competitions || found == false) {
      teamService.deleteTeam(teamId).then((value) => {
        res.status(200).send({team: value})
      }).catch((err) => {
        res.status(500).send({message: `Error al borrar el equipo`})
      })
    }
    else {
      res.status(409).send({message: `No puedes borrar el equipo porque esta en una competición`})
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    res.status(500).send({message: `Error al borrar el equipo`})
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
  deletePlayerOfTeam,
  updateTeam,
  deleteStatsOfRoundTeams,
  deleteTeam
}
