let express = require('express');
let router  = express.Router();
let passport = require('passport');
let User = require('../models/user');

router.get('/', function(req, res){
    res.render('landing');
});

router.get('/register', function(req, res){
   res.render('register');
});

router.post('/register', function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
           req.flash('success', 'Successfully Signed Up! Nice to meet you ' + req.body.username);
           res.redirect('/campgrounds');
        });
    });
});

router.get('/login', function(req, res){
   res.render('login');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res){
});

router.get('/logout', function(req, res){
   req.logout();
   req.flash('success', 'LOGGED YOU OUT!');
   res.redirect('/campgrounds');
});

module.exports = router;
