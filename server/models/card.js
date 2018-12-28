'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const CardSchema = new Schema({
  player: { type: Schema.ObjectId, ref: 'player' },
  minute: Number,
  type: String
})

module.exports = mongoose.model('card', CardSchema)