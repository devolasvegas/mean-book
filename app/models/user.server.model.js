const mongoose = require('mongoose');
const crypto = require('crypto');
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
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 6;
            },
            'Password should be longer'
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
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

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var possibleUsername = username + (suffix || '');
    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if(!err) {
            if(!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

// Custom Instance Methods
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
}

// Pre Middleware
UserSchema.pre('save', function(next) {
    if(this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// Post Middleware
UserSchema.post('save', function(next) {
    console.log('The user "' + this.username + '" details were saved.');
});

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);