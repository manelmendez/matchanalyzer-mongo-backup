const Competition = require('../models/competition')

function findById(id) {
  Competition.findById(id).populate('players').populate('stats').exec((err, competition) => {
    if (err) throw err
    else return competition
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

module.exports = {
  findById,
  findAll
}