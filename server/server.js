const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
app.listen('8080')
app.use(express.static(path.join(__dirname, '../client')))


app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})


// MongoDb

const dbOptions = {
  user: 'svc_dbadmin',
  password: 'Fractal90'
}
mongoose.connect('mongodb://ds035806.mlab.com:35806/therapp', dbOptions)

mongoose.connection.on('connected', function () {
  console.log('Connection to MongoDb established!')
})
