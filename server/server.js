const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
app.listen('80')
app.use(express.static(path.join(__dirname, '../client')))


app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})
