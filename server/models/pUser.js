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
  rate: String,
  profilecreated:Boolean,
  appointments: [
    {
      clientname: String,
      practname: String,
      meeting_id: String,
      client_id: String,
      pract_id: String,
      date_time: String
    }
  ],
  user_metadata: {
    firstName : String,
    lastName: String,
    postalcode: String,
    profileCreated: String
  },
  
  calendar: String,
  caltoken: String,
  provincestate: String,
  areas: [],
  issues: [],
  languages: [],
  modalities: [],
  serve:[]
  

})

module.exports = mongoose.model('users_pract', pUserSchema)