const Round = require('../models/round')

function findById(id) {
  Round.findById(id, (err, round) => {
    if (err) throw err
    else return round
  })
}

function findAll() {
  return new Promise ((resolve, reject) =>{
    Round.find({}, (err, rounds) => {
      if (err) reject(err)
      else resolve(rounds)
    })
  })
}
function saveRound(round) {
  return new Promise ((resolve, reject) =>{
    round.save((err) => {
      if (err) reject(err)
      else resolve(round)
    })
  })
}
function updateRound(query, update, options) {
  return new Promise ((resolve, reject) =>{
    Round.updateOne(query, update, options, function(err, round){
      if (err) reject(err)
      else resolve(round)
    })
  })
}
function deleteRound(query) {
  return new Promise ((resolve, reject) =>{
    Round.deleteOne(query, function(err, round){
      if (err) reject(err)
      else resolve(round)
    })
  })
}

module.exports = {
  findById,
  findAll,
  updateRound,
  saveRound,
  deleteRound
}