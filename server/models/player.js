'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const PlayerSchema = new Schema({
  name: String,
  position: String,
  avatar: String,
  signupDate: {
    type: Date,
    default: Date.now()
  },
  team: { type: Schema.ObjectId, ref: 'team' },
  year: String,
  stats: {
    goals: Number,
    minutes: Number,
    titularGames: Number,
    substituteGames: Number,
    playedGames: Number,
    yellowCards: Number,
    redCards: Number
  }
})

/**
 * Function that do some things before saving player in DB
 *
 */
PlayerSchema.pre('save', function(next) {
  let player = this
  //if (!player.isModified('password')) return next()
  if(!player.avatar) {
    //add avatar to player
    player.avatar = player.gravatar();
  }
  next()
})

/**
 * Function that do some things after saving player in DB
 *
 */
PlayerSchema.post('save', function() {
  let player = this
  console.log("Usuario " + player.name + " añadido correctamente al equipo " + player.team);
})

/**
 * Function adds an avatar to a player
 *
 */
PlayerSchema.methods.gravatar = function() {
  if (!this.name) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.name).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('player', PlayerSchema)