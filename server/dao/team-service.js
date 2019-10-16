const Team = require('../models/team')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    Team.findById(id).populate('players').populate('stats').exec((err, team) => {
      if (err) reject(err)
      else resolve(team)
    })
  })
}
function findByName(name) {
  return new Promise ((resolve, reject) =>{
    Team.findOne({ name: name }, function(err, team) {
      if (err) reject(err)
      else {
        resolve(team)
      }
    })
  })
}
function findByManager(manager) {
  return new Promise ((resolve, reject) =>{
    Team.find({ manager: manager }, function(err, teams) {
      if (err) reject(err)
      else {
        resolve(teams)
      }
    })
  })
}
function findAll() {
  return new Promise ((resolve, reject) =>{
    Team.find({}, (err, teams) => {
      if (err) reject(err)
      else resolve(teams)
    })
  })
}
function saveTeam(teamToSave) {
  return new Promise ((resolve, reject) =>{ 
    teamToSave.save((err) => {
      if (err) reject(err)
      else resolve(teamToSave)
    })
  })
}
function findTeamByIdAndUpdatePlayer(teamId, playerId) {
  return new Promise ((resolve, reject) =>{
    Team.findByIdAndUpdate(teamId,{ "$push": {"players": playerId}}, function(err, team) {
      if (err) reject(err)
      else resolve(team)
    })
  })
}
function findTeamByIdAndDeletePlayer(teamId, playerId) {
  return new Promise ((resolve, reject) =>{
    Team.findByIdAndUpdate(teamId,{ "$pull": {"players": playerId}}, function(err, team) {
      if (err) reject(err)
      else resolve(team)
    })
  })
}
function findTeamByIdAndUpdateStats(teamId, stats) {
  return new Promise ((resolve, reject) =>{
    Team.findOneAndUpdate({_id:teamId},{ "$push": {"stats": stats}}, {new:true}, function(err, stats) {
      if (err) reject(err)
      else resolve(stats)
    })
  })
}
function findTeamByIdAndDeleteStats(teamId, stats) {
  return new Promise ((resolve, reject) =>{
    Team.findOneAndUpdate({_id:teamId},{ "$pullAll": {"stats": stats}}, function(err, stats) {
      if (err) reject(err)
      else resolve(stats)
    })
  })
}

function findManyTeamsAndDeleteLastStats(teamStatsIds) {
  return new Promise ((resolve, reject) =>{
    Team.updateMany({stats:{ $in: teamStatsIds}}, { $pop: {stats: 1 } }, function(err, stats) {
      if (err) reject(err)
      else resolve(stats)
    })
  })
}

function updateTeam(id, team) {
  return new Promise ((resolve, reject) =>{
    Team.updateOne({_id:id}, { $set: {name: team.name, season: team.season, avatar: team.avatar } }, function(err, team) {
      if (err) reject(err)
      else resolve(team)
    })
  })
}

function deleteTeam(id) {
  return new Promise ((resolve, reject) =>{
    Team.deleteOne({_id:id}, function(err, team) {
      if (err) reject(err)
      else resolve(team)
    })
  })
}

module.exports = {
  findById,
  findByName,
  findByManager,
  findAll,
  saveTeam,
  findTeamByIdAndUpdatePlayer,
  findTeamByIdAndDeletePlayer,
  findTeamByIdAndUpdateStats,
  findTeamByIdAndDeleteStats,
  findManyTeamsAndDeleteLastStats,
  updateTeam,
  deleteTeam
}