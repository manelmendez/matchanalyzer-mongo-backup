'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const MatchSchema = new Schema({
  localTeam: { type: Schema.ObjectId, ref: 'team' },
  awayTeam: { type: Schema.ObjectId, ref: 'team' },
  localTeamGoals: Number,
  awayTeamGoals: Number,
  matchDay: { type: Date, default: Date.now() },
  competition: { type: Schema.ObjectId, ref: 'competition' },
  round: { type: Schema.ObjectId, ref: 'round'},
  stats: { type: Schema.ObjectId, ref: 'matchStats' }
})

module.exports = mongoose.model('match', MatchSchema)