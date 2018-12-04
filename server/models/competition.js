'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const CompetitionSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  teams: [
    {
      type: Schema.ObjectId,
      ref: "team"
    }
  ],
  myTeam: {
    type: Schema.ObjectId,
    ref: "team"
  },
  season: String
})

/**
 * Function that do some things after saving competition in DB
 *
 */
CompetitionSchema.post('save', function() {
  let team = this
  console.log("Competición " + competition.name + " añadida correctamente a la base de datos.");
}

module.exports = mongoose.model('competition', CompetitionSchema)