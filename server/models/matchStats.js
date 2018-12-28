'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const MatchStatsSchema = new Schema({
  part1: {
    formation: String,
    players: [{
      player: { type: Schema.ObjectId, ref: 'player' },
      position: String,
      minutes: {
        init: Number,
        final: Number
      }
    }],
    goals: [{type: Schema.ObjectId, ref: 'goal'}],
    cards: [{type: Schema.ObjectId, ref: 'card'}],
  },
  part2: {
    formation: String,
    players: [{
      player: { type: Schema.ObjectId, ref: 'player' },
      position: String,
      minutes: {
        init: Number,
        final: Number
      }
    }],
    goals: [{type: Schema.ObjectId, ref: 'goal'}],
    cards: [{type: Schema.ObjectId, ref: 'card'}],
  },
  part3: {
    formation: String,
    players: [{
      player: { type: Schema.ObjectId, ref: 'player' },
      position: String,
      minutes: {
        init: Number,
        final: Number
      }
    }],
    goals: [{type: Schema.ObjectId, ref: 'goal'}],
    cards: [{type: Schema.ObjectId, ref: 'card'}],
  },
  part4: {
    formation: String,
    players: [{
      player: { type: Schema.ObjectId, ref: 'player' },
      position: String,
      minutes: {
        init: Number,
        final: Number
      }
    }],
    goals: [{type: Schema.ObjectId, ref: 'goal'}],
    cards: [{type: Schema.ObjectId, ref: 'card'}],
  },
})

module.exports = mongoose.model('matchStats', MatchStatsSchema)