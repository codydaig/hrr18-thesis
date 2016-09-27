var mongoose = require('mongoose')
var pUserSchema = new mongoose.Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  request_language: String
})


module.exports = mongoose.model('users_pract', pUserSchema)