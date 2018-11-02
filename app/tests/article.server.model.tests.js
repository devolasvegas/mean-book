const app = require('../../server.js');
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');

let user, article;