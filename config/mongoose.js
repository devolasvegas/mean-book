const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db, {
        useNewUrlParser: true
    }, function(error) {
        if(error) {
            console.error(error);
        } else {
            console.log('MongoDB Connected')
        }
    });

    // User model
    require('../app/models/user.server.model');
    
    // Article model
    require('../app/models/article.server.model');

    return db;
}