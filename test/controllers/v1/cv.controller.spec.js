'use strict';
var requireHelper = require('../../require_helper');
var app = requireHelper('app');
var request = require('supertest');
var should = require('chai').should();
var utils = require('../../test_utils');
var _ = require('underscore');

describe('GET /cv', function() {

  it('Should retrieve the whole cv', function(done) {
    request(app)
    .get('/v1/cv')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].informations);
      done();
    })
  }); 

  it('Should retrieve only informations category from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=informations')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].informations);
      should.not.exist(cv[0].skills);
      done();
    })
  }); 

  it('Should retrieve only informations mail from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=informations(mail)')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].informations);
      should.exist(cv[0].informations.mail);
      should.not.exist(cv[0].informations.phone);
      should.not.exist(cv[0].skills);
      done();
    })
  }); 

  it('Should retrieve only skills category from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=skills')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].skills);
      should.not.exist(cv[0].informations);
      done();
    })
  }); 

  it('Should retrieve only java skill from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=skills(java)')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].skills);
      should.exist(cv[0].skills.java);
      should.not.exist(cv[0].skills.bdd);
      should.not.exist(cv[0].informations);
      done();
    })
  }); 

  it('Should retrieve only experience category from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=experience')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].experience);
      should.not.exist(cv[0].informations);
      done();
    })
  }); 

  it('Should retrieve only S.I.I experience from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=experience(sii)')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].experience);
      should.exist(cv[0].experience.sii);
      should.not.exist(cv[0].experience.viseo);
      should.not.exist(cv[0].informations);
      done();
    })
  }); 

  it('Should retrieve only formation category from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=formation')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].formation);
      should.not.exist(cv[0].languages);
      done();
    })
  }); 

  it('Should retrieve only languages category from cv', function(done) {
    request(app)
    .get('/v1/cv?fields=languages')
    .expect(200)
    .expect('Accept-Range', 'cv 1')
    .end(function(err, res) {
      should.not.exist(err);
      var cv = res.body;
      cv.should.be.instanceof(Array);
      cv.should.have.length(1);  
      should.exist(cv[0].languages);
      should.not.exist(cv[0].informations);
      done();
    })
  }); 

});