'use strict'

const Player = require('../models/player.js')

/**
 * Function to sign up a new user in the DB 
 *
 */
function addPlayer(req, res) {
  // getting data
  const player = new Player({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    provider: 'local'
  })
  // check if user exists in database
  User.findOne({ email: user.email }, function(err, existingUser) {
    // case if error in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al registrar usuario: ${err}`
      })
    }
    // case if user not exists ==> register
    if (!existingUser) {
      console.log("No existe usuario con ese email, registrando...")
      // saving user in DB
      user.save((err) => {
        if (err) return res.status(500).send({
          message: `Error al crear el usuario: ${err}`
        })
        return res.status(200).send({
          token: tokenServices.createToken(user)
        })
      })
    }
    // case if user exists ==> RETURN Error
    if (existingUser) {
      console.log("Este email ya está registrado, no se puede continuar.")
      return res.status(202).send({
        message: `Error. Email ya registrado`
      })
    }
  })
}

/**
 * Function to sign in the web
 *
 */
function signIn(req, res) {
  // search for user in DB
  User.find({
    email: req.body.email
  }, (err, user) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al iniciar sessión: ${err}`
      })
    }
    // case if user is not found on DB
    if (!user[0]) {
      console.log("No existe el usuario")
      return res.status(401).send({
        message: 'Algunos de los datos introducidos son incorrectos.'
      })
    }
    // case if user found
    if (user[0]) {
      req.user = user[0]
      // check if password is OK
      if (bcrypt.compareSync(req.body.password, user[0].password)) {
        // setting loginDate on DB
        User.loginDate(user[0].id, function(err, userLoged) {
          if(err) return console.log(err);
          console.log(`${user[0].email} se ha logueado correctamente`)
        });
        res.status(200).send({
          message: 'Te has logueado correctamente',
          token: tokenServices.createToken(user[0]),
          user: user[0]
        })
      }
      //case if password is incorrect
      else {
        console.log("UNAUTHORIZED. Contraseña incorrecta.")
        return res.status(401).send({
          message: 'Algunos de los datos introducidos son incorrectos.'
        })
      }
    }
  })
}
function saveNoteToUser(noteId, userId) {
  // search for user in DB
  User.findById(userId, (err, user) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
      return ({
        message: `Error al guardar nota: ${err}`
      })
    }
    // case if user is not found on DB
    if (!user) {
      console.log("No existe el usuario")
      return ({
        message: 'Algunos de los datos introducidos son incorrectos.'
      })
    }
    // case if user found
    if (user) {
      // setting new note to user array on DB
      User.saveNote(user.id, noteId, function(err, userUpdated) {
        if(err) return console.log(err);
        return userUpdated
      });
      
    }
  })
}
function getUser(req, res) {
  let userId = req.params.id
  //search user on DB
  User.findById(userId, (err, user) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al buscar: ${err}`
      })
    }
    // case if user is not found on DB
    if (!user) {
      console.log("No existe el usuario")
      return res.status(401).send({
        message: 'Algunos de los datos introducidos son incorrectos.'
      })
    }
    // case if user found
    if (user) {
      console.log(user);
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        user: user
      })
    }
  })
}
function getUserNotes(userId) {
  return new Promise((resolve, reject) => {
    //search user on DB
    User.findById(userId, (err, user) => {
      // case if there is any problem in search
      if (err) {
        console.log(`Error: ${err}`)
        reject({ message: `Error al buscar: ${err}` })
      }
      // case if user is not found on DB
      if (!user) {
        console.log("No existe el usuario")
        reject({ message: 'Algunos de los datos introducidos son incorrectos.'} )
      }
      // case if user found
      if (user) {
        // send user notes
        resolve (user.notes)
      }
    })
  });
}
function getAllUsers(req, res) {
  User.find({},(err, users) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
    }
    if (users) {
      res.status(200).send({
        users: users
      })
    }
  })
}

module.exports = {
  signUp,
  signIn,
  saveNoteToUser,
  getUser,
  getUserNotes,
  getAllUsers
}
