exports.render = function(req, res) {

    if(req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }

    req.session.lastVisit = new Date();
    
    res.render('index', {
        title: 'Hello Worldzzz!',
        heading: 'Well, ain\'t this some shit?',
        userFullName: req.user ? req.user.fullName : ''
    })
};