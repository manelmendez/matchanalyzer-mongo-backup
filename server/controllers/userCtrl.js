'use strict'

const User = require('../models/user')
const tokenServices = require('../services/token-services')
const bcrypt = require('bcrypt-nodejs')

/**
 * Function to sign up a new user in the DB
 *
 */
function signUp(req, res) {
  console.log(req.body)
  // getting data
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    provider: 'local'
  })
  console.log("Registrando usuario con nombre: " + user.name + "...");
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
        console.log(user);
        delete user['password']
        return res.status(200).send({
          message: 'Te has registrado correctamente',
          token: tokenServices.createToken(user),
          user: user
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
        delete user[0]['password']
        console.log(user[0]);
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

function getUser(req, res) {
  let userId = req.params.id
  console.log("Buscando usuario con ID: "+userId+ "...");
  //search user on DB
  // User.findOne({_id:userId}, (err, user) => {
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
      console.log("No existe el usuario.")
      return res.status(401).send({
        message: 'Algunos de los datos introducidos son incorrectos.'
      })
    }
    // case if user found
    if (user) {
      console.log("Usuario encontrado.");
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        user: user
      })
    }
  })
}

function getAllUsers(req, res) {
  console.log("Buscando todos los usuarios...");
  User.find({},(err, users) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
    }
    if (users) {
      console.log("Usuarios encontrados.");
      res.status(200).send({
        users: users
      })
    }
  })
}

module.exports = {
  signUp,
  signIn,
  getUser,
  getAllUsers
}
