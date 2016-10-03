const expect = require('chai').expect
const express = require('express')
const request = require('supertest')('http://localhost:8080');

describe('GET /veruser/:email', function() {
  it('confirm user exists in mongo db, returns object with boolean', function(done){
    request
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