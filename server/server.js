const express = require('express')
const aws = require('aws-sdk')
const mongoose = require('mongoose')
const path = require('path')
var bodyParser = require('body-parser');
const app = express()
const cred = require('../creds')
const clientUserModel = require('./models/clientUser')
const pUserModel = require('./models/pUser')

mongoose.Promise = require('bluebird')

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')))

mongoose.connect('mongodb://ds035806.mlab.com:35806/therapp', cred.dbOptions)


aws.config.update(cred.aws)

// clientUser account verification 
app.get('/veruser/:email', (req, res) => {
   clientUserModel.find({"email": req.params.email }).then((user) => {
       res.send({registered: true})
  })
  .catch((err) => {
    res.send({registered: false})
  })
})

app.get('/verprofile/:_id', (req, res) => {

  console.log(req.params)
    pUserModel.find({'_id': req.params._id}).then((user) => {
     res.send({user: user[0]})
  })
  .catch((err) => {
    console.log(err)
  })
})

app.post('/updateprofile/:_id', (req, res) => {
 const payload = req.body
  pUserModel.findOneAndUpdate({'_id':req.params._id}, req.body)
     .then(res.sendStatus(200))
   })

app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: "therappimages",
    region: 'us-west-2', //optional
    headers: {'Access-Control-Allow-Origin': '*'}, // optional
    ACL: 'private' // this is default
}))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

// MongoDb

mongoose.connection.on('connected', () => {
    app.listen( app.get('port'))
  console.log('Connection to MongoDb established!')
})  
     
