const mongoose = require('mongoose')
  const sessionsSchema = new mongoose.Schema({
    tokbox_session: String,
    tokbox_token: String,
    meeting_id: String
  })
module.exports = mongoose.model('sessions', sessionsSchema)