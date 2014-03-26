'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    MyBus = mongoose.model('MyBus'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.myBus = function(req, res, next, id) {
    MyBus.load(id, function(err, myBus) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.myBus = myBus;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var myBus = new MyBus(req.body);
    myBus.user = req.user;

    myBus.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                myBus: myBus
            });
        } else {
            res.jsonp(myBus);
        }
    });
};

// /**
//  * Update an article
//  */
// exports.update = function(req, res) {
//     var article = req.article;

//     article = _.extend(article, req.body);

//     article.save(function(err) {
//         if (err) {
//             return res.send('users/signup', {
//                 errors: err.errors,
//                 article: article
//             });
//         } else {
//             res.jsonp(article);
//         }
//     });
// };

// /**
//  * Delete an article
//  */
// exports.destroy = function(req, res) {
//     var article = req.article;

//     article.remove(function(err) {
//         if (err) {
//             return res.send('users/signup', {
//                 errors: err.errors,
//                 article: article
//             });
//         } else {
//             res.jsonp(article);
//         }
//     });
// };

// /**
//  * Show an article
//  */
// exports.show = function(req, res) {
//     res.jsonp(req.article);
// };

// /**
//  * List of Articles
//  */
// exports.all = function(req, res) {
//     Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
//         if (err) {
//             res.render('error', {
//                 status: 500
//             });
//         } else {
//             res.jsonp(articles);
//         }
//     });
// };
