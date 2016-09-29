var mongoose = require('mongoose')
var pUserSchema = new mongoose.Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  request_language: String,
  oneline: String,
  website: String,
  certtype: String,
  certbody: String,
  certnumber: String,
  photo: String,
  bio: String,
  profilecreated:Boolean,
  appointments: [],
  user_metadata: {}
})

module.exports = mongoose.model('users_pract', pUserSchema)