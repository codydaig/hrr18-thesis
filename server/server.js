const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const cred = '../creds'
app.use(express.static(path.join(__dirname, '../client')))

app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

// MongoDb

mongoose.connect('mongodb://ds035806.mlab.com:35806/therapp', cred.bOptions)

mongoose.connection.on('connected', function () {
  app.listen('8080')
  console.log('Connection to MongoDb established!')
})
