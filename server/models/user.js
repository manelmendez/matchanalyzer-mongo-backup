'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  name: String,
  avatar: String,
  provider: String,
  provider_id: String,
  password: {
    type: String
    //select: false       if I dont want to get the pw when Find() on database
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  lastLogin: Date,
  notes: Array
})

/**
 * Function that do some things before saving user in DB
 *
 */
UserSchema.pre('save', function(next) {
  let user = this
  //if (!user.isModified('password')) return next()
  if(!user.avatar) {
    //add avatar to User
    user.avatar = user.gravatar();

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err)

        user.password = hash
        next()
      })
    })
  }
  next()
})

/**
 * Function that do some things after saving user in DB
 *
 */
UserSchema.post('save', function() {
  let user = this
  console.log("Usuario " + user.name + " registrado correctamente con el email: " + user.email);
})

/**
 * Function adds an avatar to a user
 *
 */
UserSchema.methods.gravatar = function() {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

/**
 * Function that set a loginDate to a user who sign in the web
 *
 */
UserSchema.statics.loginDate = function loginDate(id, callback) {
   return this.findByIdAndUpdate(id, { $set : { 'lastLogin' : Date.now() }}, { new : true }, callback);
};

/**
 * Function that save a new note to a user
 *
 */
UserSchema.statics.saveNote = function saveNote(id, noteId, callback) {
   return this.findByIdAndUpdate(id, { $push : { 'notes' : noteId }}, callback);
};


module.exports = mongoose.model('User', UserSchema)