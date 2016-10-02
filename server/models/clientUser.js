var mongoose = require('mongoose')
var clientUserSchema = new mongoose.Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  request_language: String,
  appointments: [],
  user_metadata: {
    firstName : String,
    lastName: String,
    postalcode: String
  }
})


module.exports = mongoose.model('users_client', clientUserSchema)