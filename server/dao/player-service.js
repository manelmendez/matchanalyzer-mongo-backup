const Player = require('../models/player.js')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    Player.findById(id, (err, player) => {
      if (err) reject(err)
      else resolve(player)
    })
  })
}

function findByName(name) {
  return new Promise ((resolve, reject) =>{
    Player.findOne({ name: name }, (err, player) => {
      if (err) reject(err)
      else resolve(player)
    })
  })
}

function findAll() {
  return new Promise ((resolve, reject) =>{
    Player.find({}, (err, players) => {
      if (err) reject(err)
      else resolve(players)
    })
  })
}

function savePlayer(player) {
  return new Promise ((resolve, reject) =>{ 
    player.save((err) => {
      if (err) reject(err)
      else resolve(player)
    })
  })
}

function updatePlayer(id, player) {  
  return new Promise ((resolve, reject) =>{ 
    Player.findByIdAndUpdate(id, { $set: {name: player.name, position: player.position, year: player.year } }, { new: true }, function(err, playerUpdated) {
      if (err) reject(err)
      else resolve(playerUpdated)
    })
  })
}

function deletePlayer (id) {
  return new Promise ((resolve, reject) =>{ 
    Player.findOneAndRemove({_id:id}, function(err, player, result) {
      if (err) reject(err)
      else resolve(player)
    })
  })
}

module.exports = {
  findById,
  findByName,
  findAll,
  savePlayer,
  updatePlayer,
  deletePlayer
}
