'use strict';

// MyBuses routes use myBuses controller
var myBuses = require('../controllers/myBuses');
var authorization = require('./middlewares/authorization');

// MyBuses authorization helpers
var hasAuthorization = function(req, res, next) {
  if (req.myBus.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    // app.get('/articles', articles.all);
    // app.post('/articles', authorization.requiresLogin, articles.create);
    // app.get('/articles/:articleId', articles.show);
    // app.put('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.update);
    // app.del('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.destroy);

    // // Finish with setting up the articleId param
    // app.param('articleId', articles.article);

    app.post('/myBuses', authorization.requiresLogin, myBuses.create)

};