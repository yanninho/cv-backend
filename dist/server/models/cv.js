'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CvSchema = new Schema({
    "_id" : Number,
    "informations" : {
        "name" : String,
        "address" : String,
        "phone" : String,
        "mail" : String
    },
    "skills" : {},
    "experience" : {},
    "formation" : [{
        "school" : String,
        "date" : String,
        "name" : String
    }],
    "languages" : {}
});

var collectionName = 'cv'
module.exports = mongoose.model('CV', CvSchema, collectionName);