const User = require('../models/user')

function findById(id) {
  User.findById(id, (err, user) => {
    if (err) throw err
    else return user
  })
}
function findByEmail(email) {
  return new Promise ((resolve, reject) =>{
    User.findOne({ email: email }, function(err, user) {
      if (err) reject(err)
      else {        
        resolve(user)
      }
    })
  })
}
function findAll() {
  return new Promise ((resolve, reject) =>{
    User.find({}, (err, users) => {
      if (err) reject(err)
      else resolve(users)
    })
  })
}
function saveUser(user) {
  return new Promise ((resolve, reject) =>{
    user.save((err) => {
      if (err) reject(err)
      else resolve(user)
    })
  })
}

module.exports = {
  findById,
  findByEmail,
  findAll,
  saveUser
}