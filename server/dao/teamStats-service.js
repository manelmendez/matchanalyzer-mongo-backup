const TeamStats = require('../models/teamStats.js')

function findByRoundId(roundId) {
  return new Promise ((resolve, reject) =>{
    TeamStats.find({ round: roundId }, function(err, teamStats) {
      if (err) reject(err)
      else resolve(teamStats)
    })
  })
}

function saveTeamStats(statsToSave) {
  return new Promise ((resolve, reject) =>{
    statsToSave.save((err) => {
      if (err) reject(err)
      else resolve(statsToSave)
    })
  })
}

function updateTeamStats (id, stats) {
  return new Promise ((resolve, reject) =>{
    TeamStats.findOneAndUpdate({_id: id}, {$set:stats}, {new:true}, function(err, stats) {
      if (err) reject(err)
      else resolve(stats)
    })
  })
}

function deleteTeamStats (teamStatsId) {
  TeamStats.findByIdAndDelete(teamStatsId, function(err, stats) {
    if (err) reject(err)
    else resolve(stats)
  })
}

function deleteMatchTeamStats (localTeamStatsId, awayTeamStatsId) {
  TeamStats.deleteMany({_id:[localTeamStatsId, awayTeamStatsId]}, function(err, stats) {
    if (err) reject(err)
    else resolve(stats)
  })
}

function deleteTeamStatsByRoundId(roundId) {
  TeamStats.deleteMany({round: roundId}, function(err, stats) {
    if (err) reject(err)
    else resolve(stats)
  })
}

module.exports = {
  findByRoundId,
  saveTeamStats,
  updateTeamStats,
  deleteTeamStats,
  deleteMatchTeamStats,
  deleteTeamStatsByRoundId
}