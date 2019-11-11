const Competition = require('../models/competition')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    Competition.findById(id).populate([{
      path:'teams',
      populate: {
        path: 'stats'
      }
    },
    {
      path:'myTeam',
      populate: {
        path:'players'
      }
    },
    {
      path: 'rounds',
      populate: {
        path: 'matches',
        populate: [{
          path: 'localTeam',
          populate: {
            path: 'players'
          }
        },
        {
          path: 'awayTeam',
          populate: {
            path: 'players'
          }
        }]
      }
    }]).exec((err, competition) => {
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
    Competition.findOneAndUpdate(query, update, options, function(err, competition){
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function deleteCompetition(id) {
  return new Promise ((resolve, reject) =>{ 
    Competition.findOneAndRemove({_id:id}, function(err, competition, result) {
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
  updateCompetition,
  deleteCompetition
}