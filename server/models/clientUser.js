var mongoose = require('mongoose')
var clientUserSchema = new mongoose.Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  request_language: String,
  appointments: []
})


module.exports = mongoose.model('users_client', clientUserSchema)