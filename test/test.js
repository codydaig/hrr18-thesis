const expect = require('chai').expect
const express = require('express')
const server = require('../server/server.js')
const request = require('supertest');
/*

describe('GET /veruser/:email', function() {
  it('confirm user exists in mongo db, returns object with boolean', function(done){
    request(server)
      .get('/veruser/jfritz50@gmail.com')
      .end(function(error, res){
        if(error){
          return done(error);
        }
        expect(res.body.registered).to.equal(true)
        done()
      })
  })
})
*/