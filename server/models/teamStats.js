'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const TeamStatsSchema = new Schema({
  round: { type: Schema.ObjectId, ref: "round" },
  gamesPlayed: Number,
  homeGamesPlayed: Number,
  awayGamesPlayed: Number,
  points: Number,
  homePoints: Number,
  awayPoints: Number,
  wins: Number,
  homeWins: Number,
  awayWins: Number,
  draws: Number,
  homeDraws: Number,
  awayDraws: Number,
  loses: Number,
  homeLoses: Number,
  awayLoses: Number,
  goals: Number,
  homeGoals: Number,
  awayGoals: Number,
  againstGoals: Number,
  homeAgainstGoals: Number,
  awayAgainstGoals: Number,
})

module.exports = mongoose.model('teamStats', TeamStatsSchema)