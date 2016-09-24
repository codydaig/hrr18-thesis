const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const cred = require('../creds')
const clientUserModel = require('./models/clientUser')

mongoose.Promise = require('bluebird')

app.set('port', (process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, '../client')))

mongoose.connect('mongodb://ds035806.mlab.com:35806/therapp', cred.dbOptions)

// clientUser account verification 
app.get('/veruser/:email', (req, res) => {
   clientUserModel.find({"email": req.params.email }).then((user) => {
       res.send({registered: true})
  })
  .catch((err) => {
    res.send({registered: false})
  })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

// MongoDb

mongoose.connection.on('connected', () => {
    app.listen( app.get('port'))
  console.log('Connection to MongoDb established!')
})  
     
