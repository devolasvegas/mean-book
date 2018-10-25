const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.createConnection(config.db, {
        useNewUrlParser: true
    });

    // User model
    require('../app/models/user.server.model');
    
    // Article model
    require('../app/models/article.server.model');

    return db;
}