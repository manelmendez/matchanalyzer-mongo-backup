'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const MyMatchSchema = new Schema({
  localTeam: { type: Schema.ObjectId, ref: 'team' },,
  awayTeam: { type: Schema.ObjectId, ref: 'team' },,
  localTeamGoals: Number,
  awayTeamGoals: Number,
  matchDay: Number,
  signupDate: { type: Date, default: Date.now() },
  competition: { type: Schema.ObjectId, ref: 'competition' },
  stats: {
    quarter1: {
      formation: String,
      players: [{
        player: { type: Schema.ObjectId, ref: 'player' },
        position: String,
        minutes: {
          init: 0,
          final: 15
        }
      }],
      goals: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      },
      cards: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      }
    },
    quarter2: {
      formation: String,
      players: [{
        player: { type: Schema.ObjectId, ref: 'player' },
        position: String,
        minutes: {
          init: 15,
          final: 30
        }
      }],
      goals: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      },
      cards: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      }
    },
    quarter3: {
      formation: String,
      players: [{
        player: { type: Schema.ObjectId, ref: 'player' },
        position: String,
        minutes: {
          init: 30,
          final: 45
        }
      }],
      goals: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      },
      cards: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      }
    },
    quarter4: {
      formation: String,
      players: [{
        player: { type: Schema.ObjectId, ref: 'player' },
        position: String,
        minutes: {
          init: Number,
          final: Number
        }
      }],
      goals: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      },
      cards: {
        player: { type: Schema.ObjectId, ref: 'player' },
        minute: Number,
        type: String
      },
      substitutions: {
        in: { type: Schema.ObjectId, ref: 'player' },
        out: { type: Schema.ObjectId, ref: 'player' },
        minute: Number
      }
    },
  }
})

module.exports = mongoose.model('myMatch', MyMatchSchema)