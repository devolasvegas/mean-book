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