const User = require('../models/user')
const tokenServices = require('../services/token-services')
const bcrypt = require('bcrypt-nodejs')
const userService = require('../dao/user-service')
/**
 * Function to sign up a new user in the DB
 *
 */
function signUp(req, res) {
  console.log(req.body)
  // getting data
  let user = req.body  
  console.log("Registrando usuario con nombre: " + user.name + "...");  
  userService.findByEmail(user.email).then((userFound) => {
    if (userFound) {
      console.log("Este email ya está registrado, no se puede continuar.")
      return res.status(409).send({
        message: `Error. Email ya registrado`
      })
    }
    else{
      console.log("No existe usuario con ese email, registrando...")
      // saving user in DB
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        provider: 'local'
      })
      userService.saveUser(user).then((userSaved) => {
        delete user['password']
        return res.status(200).send({
          message: 'Te has registrado correctamente',
          token: tokenServices.createToken(userSaved),
          user: userSaved
        })
      })
      .catch((err) => {
        return res.status(500).send({
          message: `Error al crear el usuario: ${err}`
        })
      })
    }
  })
  .catch((err)=>{
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al registrar usuario: ${err}`
    })
  })
}

/**
 * Function to sign in the web
 *
 */
function signIn(req, res) {
  // search for user in DB
  userService.findByEmail(req.body.email).then((userFound) => {
    if (userFound) {
      // check if password is OK
      if (bcrypt.compareSync(req.body.password, userFound.password)) {
        // setting loginDate on DB
        User.loginDate(userFound.id, function(err, userLoged) {
          if(err) return console.log(err);
          console.log(`${userFound.email} se ha logueado correctamente`)
        });
        delete userFound['password']
        console.log(userFound);
        res.status(200).send({
          message: 'Te has logueado correctamente',
          token: tokenServices.createToken(userFound),
          user: userFound
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
    else{
      console.log("No existe el usuario")
      return res.status(401).send({
        message: 'Algunos de los datos introducidos son incorrectos.'
      })
    }
  })
  .catch((err)=>{
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al iniciar sessión`
    })
  })  
}

function getUser(req, res) {
  let userId = req.params.id
  console.log("Buscando usuario con ID: "+userId+ "...");
  //search user on DB
  // User.findOne({_id:userId}, (err, user) => {
  userService.findById(userId).then((user) => {
    // case if user found
    if (user) {
      console.log("Usuario encontrado.");
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        user: user
      })
    }
    else {
      console.log("No existe el usuario.")
      return res.status(401).send({
        message: 'No existe el usuario'
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function getAllUsers(req, res) {
  console.log("Buscando todos los usuarios...");
  userService.findAll().then((users) => {
    console.log("Usuarios encontrados.");
    res.status(200).send({
      users: users
    })
  }).catch((err) => {
    console.log(`Error: ${err}`)
  })
}

module.exports = {
  signUp,
  signIn,
  getUser,
  getAllUsers
}
