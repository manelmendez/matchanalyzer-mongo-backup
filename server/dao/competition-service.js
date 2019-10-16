const Competition = require('../models/competition')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    Competition.findById(id).populate({
      path:'teams',
      populate: {
        path: 'stats'
      }
    })
    .populate('myTeam').populate('players')
    .populate({
      path: 'rounds',
      populate: {
        path: 'matches',
        populate: [
          {path: 'localTeam'},
          {path: 'awayTeam'}
        ]
      }
    }).exec((err, competition) => {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function findByName(name) {
  return new Promise ((resolve, reject) =>{
    Competition.findOne({name:name}, function(err, competition) {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function findByManager(id) {
  return new Promise ((resolve, reject) => {
    Competition.find({manager: id}).populate('myTeam').exec((err, competition) => {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function findAll() {
  return new Promise ((resolve, reject) =>{
    Competition.find({}, (err, competitions) => {
      if (err) reject(err)
      else resolve(competitions)
    })
  })
}
function saveCompetition(competition) {
  return new Promise ((resolve, reject) =>{
    competition.save((err) => {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function updateCompetition(query, update, options) {
  return new Promise ((resolve, reject) =>{
    Competition.updateOne(query, update, options, function(err, competition){
      if (err) reject(err)
      else resolve(competition)
    })
  })
}

module.exports = {
  findById,
  findByName,
  findByManager,
  findAll,
  saveCompetition,
  updateCompetition
}