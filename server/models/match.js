'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const MatchSchema = new Schema({
  localTeam: { type: Schema.ObjectId, ref: 'team' },,
  awayTeam: { type: Schema.ObjectId, ref: 'team' },,
  localTeamGoals: Number,
  awayTeamGoals: Number,
  matchDay: Number,
  signupDate: { type: Date, default: Date.now() },
  competition: { type: Schema.ObjectId, ref: 'competition' }
})

module.exports = mongoose.model('match', MatchSchema)