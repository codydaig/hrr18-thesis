var mongoose = require('mongoose')
var pUserSchema = new mongoose.Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  request_language: String,
  intro: String,
  website: String,
  certtype: String,
  certbody: String,
  certnumber: String,
  bio: String,
  profilecreated:Boolean,
  appointments: []
})

module.exports = mongoose.model('users_pract', pUserSchema)