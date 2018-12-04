'use strict'

const Player = require('../models/player.js')

/**
 * Function to sign up a new player in the DB
 *
 */
function addPlayer(req, res) {
  // getting data
  const player = new Player({
    name: req.body.name,
    position: req.body.position,
    year: req.body.year,
    team: req.body.team
  })
  // check if player exists in database
  Player.findOne({ name: player.name }, function(err, existingPlayer) {
    // case if error in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al registrar jugador: ${err}`
      })
    }
    // case if player not exists ==> register
    if (!existingPlayer) {
      console.log("No existe jugador con ese nombre, registrando...")
      // saving player in DB
      player.save((err) => {
        if (err) return res.status(500).send({
          message: `Error al crear el jugador: ${err}`
        })
        return res.status(200).send(
          player
        )
      })
    }
    // case if player exists ==> RETURN Error
    if (existingPlayer) {
      console.log("Este nombre ya está registrado, no se puede continuar.")
      return res.status(202).send({
        message: `Error. Jugador ya registrado`
      })
    }
  })
}

function getPlayer(req, res) {
  let playerId = req.params.id
  //search player on DB
  Player.findById(playerId, (err, player) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: `Error al buscar: ${err}`
      })
    }
    // case if player is not found on DB
    if (!player) {
      console.log("No existe el usuario")
      return res.status(401).send({
        message: 'Algunos de los datos introducidos son incorrectos.'
      })
    }
    // case if player found
    if (player) {
      console.log(player);
      // send player
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        player: player
      })
    }
  })
}
function getPlayerByTeamId(req, res) {
  let teamId = req.params.id
  return Player.find({team: teamId}).populate('team')
    .then(player => {
      console.log(player);
      res.status(200).send(player)
    })
}

function getAllPlayers(req, res) {
  Player.find({},(err, players) => {
    // case if there is any problem in search
    if (err) {
      console.log(`Error: ${err}`)
    }
    if (players) {
      res.status(200).send({
        players: players
      })
    }
  })
}

module.exports = {
  addPlayer,
  getPlayer,
  getAllPlayers,
  getPlayerByTeamId
}
