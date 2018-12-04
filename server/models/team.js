'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const TeamSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  avatar: String,
  signupDate: {
    type: Date,
    default: Date.now()
  },
  players: [
    {
      type: Schema.ObjectId,
      ref: "player"
    }
  ],
  manager: String,
  season: String
})

/**
 * Function that do some things before saving team in DB
 *
 */
TeamSchema.pre('save', function(next) {
  let team = this
  //if (!team.isModified('password')) return next()
  if(!team.avatar) {
    //add avatar to team
    team.avatar = team.gravatar();
  }
  next()
})

/**
 * Function that do some things after saving team in DB
 *
 */
TeamSchema.post('save', function() {
  let team = this
  console.log("Equipo " + team.name + " añadido correctamente a la base de datos de " + team.manager);
})

/**
 * Function adds an avatar to a team
 *
 */
TeamSchema.methods.gravatar = function() {
  if (!this.name) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.name).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('team', TeamSchema)