const mongoose = require('mongoose')
const sessionsSchema = new mongoose.Schema({
  tokbox_session: String,
  tokbox_token: String,
  meeting_id: String,
  client_id: String,
  pract_id: String,
  date_time: String,
  practname: String,
  clientname: String,
  complete: Boolean
})
module.exports = mongoose.model('sessions', sessionsSchema)