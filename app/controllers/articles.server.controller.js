const mongoose = require('mongoose');
const Article = mongoose.model('Article');

function getErrorMessage(err) {
    if(err.errors) {
        for(let errName in err.errors) {
            if(err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    } else {
        return 'Unknown server error';
    }
}

// Create a new article
exports.create = function(req, res) {
    const article = new Article(req.body);
    article.creator = req.user;

    article.save((err) => {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};

// Retrieve all articles
exports.list = function(req, res) {
    Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, articles) => {
        if(err) {
            return res.status(400).send({ message: getErrorMessage(err) });
        } else {
            res.status(200).json(articles);
        }
    });
};

// Get article by ID
exports.articleByID = function(req, res, next, id) {
    Article.findById(id).populate('creator', 'firstName lastName fullName').exec((err, article) => {
        if(err) return next(err);
        if(!article) return next(new Error('Failed to load article ' + id));

        req.article = article;
        next();
    });
};

// Output retrieved article
exports.read = function(req, res) {
    res.status(200).json(req.article);
}

// Update an article
exports.update = function(req, res) {
    const article = req.article;

    article.title = req.body.title;
    article.content = req.body.content;

    article.save((err) => {
        if(err) {
            return res.status(400).send({ message: getErrorMessage(err) });
        } else {
            res.status(200).json(article);
        }
    });
};

// Delete an article
exports.delete = function(req, res) {
    const article = req.article;

    article.remove((err) => {
        if(err) {
            return res.status(400).send({ message: getErrorMessage(err) });
        } else {
            res.status(200).json(article);
        }
    });
};

// Check to see if a user is authorized to perform an operation
exports.hasAuthorization = function(req, res, next) {
    if(req.article.creator.id !== req.user.id) {
        return res.status(403).send({ message: 'Your ass isn\'t authorized, motherfucker!' });
    }

    next();
}