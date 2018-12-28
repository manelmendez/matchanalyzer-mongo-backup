'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const RoundSchema = new Schema({
  name: {
    type: String,
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  matches: [
    {
      type: Schema.ObjectId,
      ref: "match"
    }
  ]
})

RoundSchema.post('save', function() {
  let round = this
  console.log("Jornada " + round.name + " añadida correctamente a la base de datos.");
})

module.exports = mongoose.model('round', RoundSchema)