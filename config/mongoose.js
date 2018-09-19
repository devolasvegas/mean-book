const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db, {
        useNewUrlParser: true
    });

    // User model
    require('../app/models/user.server.model');

    return db;
}