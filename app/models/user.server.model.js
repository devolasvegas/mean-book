const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    website: {
        type: String,
        get: function(url) {
            if(!url) {
                return url;
            } else {
                if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }

                return url;
            }
        }
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// Virtual Attributes
UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

// Custom Static Methods
UserSchema.statics.findOneByUsername = function(username, callback) {
    this.findOne({ username: new RegExp(username, 'i') }, callback);
};

// Custom Instance Methods
UserSchema.methods.authenticate = function(password) {
    return this.password === password;
}

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);