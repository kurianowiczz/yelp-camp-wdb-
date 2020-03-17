let Comment = require('../models/comment');
let Campground = require('../models/campground');

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You must be signed in');
        res.redirect('/login');
    },
    checkUserCampground: function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, campground){
               if(campground.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash('error', 'You dont have permit');
                   console.log('BAD');
                   res.redirect('/campgrounds/' + req.params.id);
               }
            });
        } else {
            req.flash('error', 'You need to be signed in');
            res.redirect('/login');
        }
    },
    checkUserComment: function(req, res, next){
        console.log('YOU MADE');
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentId, function(err, comment){
               if(comment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash('error', 'You dont have ');
                   res.redirect('/campgrounds/' + req.params.id);
               }
            });
        } else {
            req.flash('error', 'You need to be signed in');
            res.redirect('login');
        }
    }
};
