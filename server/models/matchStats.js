'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const MatchStatsSchema = new Schema({
  part: Number,
  formation: String,
  players: [{
    player: { type: Schema.ObjectId, ref: 'player' },
    position: String,
    minutes: [{
      init: Number,
      final: Number
    }]
  }],
  goals: [{type: Schema.ObjectId, ref: 'goal'}],
  cards: [{type: Schema.ObjectId, ref: 'card'}]
})

module.exports = mongoose.model('matchStats', MatchStatsSchema)