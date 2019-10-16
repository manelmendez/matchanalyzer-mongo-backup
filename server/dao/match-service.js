const Match = require('../models/match')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    Match.findById(id, function(err, match) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}

function findAll() {
  return new Promise ((resolve, reject) =>{
    Match.find({}, (err, matchs) => {
      if (err) reject(err)
      else resolve(matchs)
    })
  })
}
function saveMatch(match) {
  return new Promise ((resolve, reject) =>{
    match.save((err) => {
      if (err) reject(err)
      else resolve(match)
    })
  })
}
function updateMatch(query, update, options) {
  return new Promise ((resolve, reject) =>{
    Match.findOneAndUpdate(query, update, options, function(err, match){
      if (err) reject(err)
      else resolve(match)
    })
  })
}
function deleteMatch (id) {
  return new Promise ((resolve, reject) =>{ 
    Match.findOneAndRemove({_id:id}, function(err, match, result) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}

module.exports = {
  findById,
  findAll,
  saveMatch,
  updateMatch,
  deleteMatch
}