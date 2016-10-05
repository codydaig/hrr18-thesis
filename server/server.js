const path = require('path')
const https = require('https')
const fs = require('fs')
const cert = fs.readFileSync('./certs/cert.pem').toString()
const key = fs.readFileSync('./certs/key.pem').toString()
const express = require('express')
const aws = require('aws-sdk')
const mongoose = require('mongoose')
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
const moment = require('moment');
const apollo = require('apollo-server')
const apolloExpress = apollo.apolloExpress
const jwt = require('express-jwt');
const graffiti = require('@risingstack/graffiti-mongoose')
const graphql  = require('graphql')
const getSchema = graffiti.getSchema
const schedule = require('node-schedule');

mongoose.Promise = require('bluebird')
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')))

const options = {
  mutation: true, // mutation fields can be disabled
  allowMongoIDMutation: false // mutation of mongo _id can be enabled
};

const GraphQLschema = getSchema([pUserModel, clientUserModel], options)
app.use('/graphql', bodyParser.json(), apolloExpress({ schema: GraphQLschema }))

var jwtCheckClient = jwt({
  secret: new Buffer(cred.Auth0options.client.clientSecret, 'base64'),
  audience: cred.Auth0options.client.clientID
});

var jwtCheckPract = jwt({
  secret: new Buffer(cred.Auth0options.p.clientSecret, 'base64'),
  audience: cred.Auth0options.p.clientID
});

app.use('/graphiql', apollo.graphiqlExpress({
  endpointURL: '/graphql',
}));

app.get('/veruser/:email', (req, res) => {
  //console.log(req)
  clientUserModel.find({ "email": req.params.email }).then((user) => {

    res.status(200).send({ registered: true })
  
  })
    .catch((err) => {
      res.send({ registered: false })
    })
})

app.use('/getclientdata/:_id',jwtCheckClient)
app.get('/getclientdata/:_id', (req, res) => {
  clientUserModel.findOne({ '_id': req.params._id }).then((data) => {
    res.send(data)
  })
})

app.use('/getall', jwtCheckClient)
app.get('/getall', (req, res) => {
  pUserModel.find().then((practitioner) => {
    res.send(practitioner)
  })
    .catch((err) => {
      console.log(err)
    })
})

app.use('/book', jwtCheckClient)
app.post('/book', (req, res) => {
  const aptId = randomstring.generate()
  var payload = extend(req.body, { aptId: aptId })
  var practname

  pUserModel.findOne({ _id: payload.practId }).then((practitioner) => {
    const name = practitioner.user_metadata.firstName + ' ' + practitioner.user_metadata.lastName
    payload.photo = practitioner.photo
    practname = name
  })
    .then(() => {
      payload.practname = practname
      payload.fmtdate = moment(payload.date).format('dddd, MMMM, DD')
      payload.fmttime = moment(payload.time).format('h:mm a')
      payload.datetime = payload.fmtdate + " @ " + payload.fmttime

      clientUserModel.findOne({ _id: req.body.clientId }).then((client) => {
        client.appointments.push(payload)
        client.save()
      })
    })

  pUserModel.findOne({ _id: req.body.practId }).then((practitioner) => {
    practitioner.appointments.push(payload)
    practitioner.save()
  })

  opentok.createSession((err, session) => {
    const token = opentok.generateToken(session.sessionId)
    const Session = new sessionModel({
      tokbox_session: session.sessionId,
      tokbox_token: token,
      meeting_id: aptId
    })
    Session.save()
  })
})

app.use('/verprofile/:_id', jwtCheckPract)
app.get('/verprofile/:_id', (req, res) => {
  pUserModel.find({ '_id': req.params._id }).then((user) => {
    res.send({ user: user[0] })
  })
    .catch((err) => {
   //   console.log(err)
    })
})

app.use('/verprofile/:_id', jwtCheckClient)
app.get('/getpname/:_id', (req, res) => {
  pUserModel.findOne({ '_id': req.params._id }).then((data) => {
    const name = data.user_metadata.firstName + data.user_metadata.lastName
    const payload = { name: name }
    res.send(payload)
  })
})

app.use('/getpractitionerdata/:_id', jwtCheckClient)
app.get('/getpractitionerdata/:_id', (req, res) => {
  pUserModel.findOne({ '_id': req.params._id }).then((data) => {
    res.send(data)
  })
})


app.get('/test',() => {
  console.log('testting!!!')
})

//app.use('/gettoken/:id', jwtCheckClient)
app.get('/gettoken/:id', (req, res) => {
  console.log(req.params)
  sessionModel.findOne({ meeting_id: req.params.id }).then((session) => {
    res.send(session)
  })
})

app.get('/getcalendar/:id',(req, res) => {
  
  pUserModel.findOne({'_id': req.params.id}).then((data) => {
    res.send({
      user_metadata: data.user_metadata,
      email:data.email,
      calendar: data.calendar,
      caltoken: data.caltoken
    })
  })
})


app.post('/scheduleroom', (req, res) => {
  const meetingID = randomstring.generate()
  const payload = {
    meeting_id: meetingID,
    client_id: req.body.client,
    pract_id: req.body.practitioner
  }


  clientUserModel.findOne({ _id: req.body.client}).then((client) => {
    client.appointments.push(payload)
    client.save()
  })
    
  pUserModel.findOne({ _id: req.body.practitioner}).then((practitioner) => {
    practitioner.appointments.push(payload)
    practitioner.save()
  })
    
  const newAppointment = new sessionModel(payload)
  newAppointment.save()


  const date = req.body.start
  let time = date.split('(')[0].split('')
  const ampm = time[time.length -3]
  time = time.slice(0, time.length -3 )
  if (ampm == 'a'){
    time.push(' AM')
  } else if(ampm == 'p'){
    time.push(' PM')
  }

  time = time.join('')
  let newdate = moment(time,'YYYY-MM-DD hh:mm a' )
  const newDate = new Date(newdate)
  const j = schedule.scheduleJob(newDate, () => {
    opentok.createSession((err, session) => {
      const token = opentok.generateToken(session.sessionId)
      sessionModel.findOneAndUpdate({meeting_id:meetingID}, {
        tokbox_session: session.sessionId,
        tokbox_token: token
      }).then((data)=> {
        console.log(data)
      }).catch((error)=>{
        console.log(error)
      })
    })
    console.log('create OpenTok Token');
  })
  res.sendStatus(200)
})

//app.use('/updateprofile/:_id', jwtCheckPract)
app.post('/updateprofile/:_id', (req, res) => {
  pUserModel.findOneAndUpdate({'_id': req.params._id},{
    'user_metadata.profileCreated'  :true,
    oneline: req.body.oneline,
    website: req.body.website,
    certtype: req.body.certtype,
    certbody: req.body.certbody,
    certnumber: req.body.certnumber,
    bio: req.body.bio 
  })
})

app.use('/getbookedtime:/id', jwtCheckClient)
app.get('/getbookedtime/:_id', (req, res) => {
  pUserModel.findOne({ _id: req.params._id }).then((session) => {
    var datetime = session.appointments.map((appointment) => {
      var dt = moment(appointment.date).format('dddd, MMMM, DD')
      var tm = moment(appointment.time).format('h:mm a')
      var dt = dt + " @ " + tm
      return dt
    })
    res.send(datetime)
  })
})


app.post('/storecalendar', (req, res) => {
  const email = req.body.email
  const payload = {
    calendar: req.body.calendar,
    caltoken: req.body.token
  }
  pUserModel.findOneAndUpdate({'email': email }, payload).then(() => {
    console.log('calendar stored')
  })
})

app.use('/s3', jwtCheckPract)
app.use('/s3', require('react-s3-uploader/s3router')({
  bucket: "therappimages",
  region: 'us-west-2', //optional
  headers: { 'Access-Control-Allow-Origin': '*' }, // optional
  ACL: 'private' // this is default
}))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

// MongoDb

const server = () => {
  mongoose.connect('mongodb://ds035806.mlab.com:35806/therapp', cred.dbOptions)
  mongoose.connection.on('connected', () => {
    app.listen(app.get('port'))
    https.createServer({ key: key, cert: cert }, app).listen(8443)
    console.log('Connection to MongoDb established!')
  })
}
 
server()

module.exports = server;