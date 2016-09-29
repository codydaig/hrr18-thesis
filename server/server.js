const express = require('express')
const aws = require('aws-sdk')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser');
const app = express()
const cred = require('../creds')
const clientUserModel = require('./models/clientUser')
const pUserModel = require('./models/pUser')
const sessionModel = require('./models/sessions')
const OpenTok = require('opentok')
const opentok = new OpenTok(cred.tokbox.apikey, cred.tokbox.secret)
const randomstring = require("randomstring");
const extend = require('extend')
const https = require('https')
const fs = require('fs')
const moment = require('moment');


const cert = fs.readFileSync('./certs/cert.pem').toString()
const key = fs.readFileSync('./certs/key.pem').toString()

console.log(cert,key)

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
  //get name
app.get('/getpname/:_id', (req, res) => {
   console.log(req.params._id)
    pUserModel.findOne({'_id': req.params._id}).then((data) => {
      const name = data.user_metadata.firstName + data.user_metadata.lastName
      const payload = {name: name}
      console.log(payload)
      res.send(payload)
    })
 })

app.get('/getpractitionerdata/:_id', (req, res) => {
   console.log(req.params._id)
    pUserModel.findOne({'_id': req.params._id}).then((data) => {
       res.send(data)
    })
 })

app.get('/getclientdata/:_id', (req, res) => {
   console.log(req.params._id)
    clientUserModel.findOne({'_id': req.params._id}).then((data) => {
       res.send(data)
    })
 })

app.get('/getall', (req, res) => {
  pUserModel.find().then((practitioner) => {
    res.send(practitioner)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('/gettoken/:id', (req, res) => {
  console.log('testing', req.params)
  sessionModel.findOne({meeting_id: req.params.id}).then((session) => {
    res.send(session)
  })
})

app.post('/updateprofile/:_id', (req, res) => {

  pUserModel.findOneAndUpdate({'_id':req.params._id}, req.body)
     .then(res.sendStatus(200))
   })

// add apointment to both practitioner and client array
 app.post('/book', (req, res) => {
  const aptId = randomstring.generate()
  var payload = extend(req.body, {aptId:aptId})
  var practname 

  pUserModel.findOne({ _id : payload.practId}).then((practitioner) => {
    const name = practitioner.user_metadata.firstName + ' ' + practitioner.user_metadata.lastName

    payload.photo = practitioner.photo
     practname = name})
      .then(() => {
          

        //add formatted name and date to appointment payload
        payload.practname = practname
        payload.fmtdate = moment(payload.date).format('dddd, MMMM, DD')
        payload.fmttime =  moment(payload.time).format('h:mm a')
        payload.datetime = payload.fmtdate + " @ " + payload.fmttime
   
        clientUserModel.findOne({ _id : req.body.clientId}).then((client) => {
          client.appointments.push(payload)
          client.save()
        }) 
     })  

  pUserModel.findOne({ _id : req.body.practId}).then((practitioner) => {
    practitioner.appointments.push(payload)
    practitioner.save()
  })  

   opentok.createSession((err, session) => {
     const token = opentok.generateToken(session.sessionId)
     const Session = new sessionModel ({
       tokbox_session: session.sessionId,
       tokbox_token: token,
       meeting_id: aptId
      })
     Session.save()
  })
  

})


//get all current appointment time formatted

app.get('/getbookedtime/:_id', (req, res) => {
  console.log('testing', req.params)
  pUserModel.findOne({_id: req.params._id}).then((session) => {
    var datetime = session.appointments.map((appointment) => {
        var dt = moment(appointment.date).format('dddd, MMMM, DD')
        var tm = moment(appointment.time).format('h:mm a')
        var dt = dt + " @ " + tm
        
        return dt
    })
       res.send(datetime)
  })
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
    https.createServer({key:key,cert: cert}, app).listen(8443)
  console.log('Connection to MongoDb established!')
})  


