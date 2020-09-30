var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var passport=require('passport'),
LocalStrategy = require('passport-local').Strategy;

const Op = Sequelize.Op;
var User = require('../models/login');

 

passport.serializeUser(function(user, done) {
  console.log(user)
   done(null, user.userId);
 });

 passport.deserializeUser(function(id, done) {
     console.log(id)
   User.findByPk(id).then(function(user) {
     done(null, user);
   }).catch((err)=>{
     done(err)
   })
 });



  passport.use(new LocalStrategy(
    {
      usernameField:'username',
      passwordField:'password',
      // session:false,
      passReqToCallback:true
    },
    function(req,username, password,done) {

      User.findOne( { where : { username : username } } ).then(function (user) {

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

         req.session.user = user ;
        return done(null, user);
      }).catch((err)=>{
        return done(err)
      })
    }
  ));





  router.post('/login',
  passport.authenticate('local',{ failureRedirect: '/', failureFlash: true }),
  function(req, res) {       
    console.log("current user is    "+req.user.name);
    let currentUser = encodeURIComponent(req.user.name);
    res.redirect('/dashboard/?currentUser='+currentUser) 
  });


  router.get('/logout', (req,res)=>{
    console.log('isauthorized',req.isAuthenticated())
    req.logout();
    req.session.destroy(function(err) {
      // cannot access session here
      if (err)   return err ;
    
      res.redirect('/')

    })
  });



  router.post('/register', function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var pass = req.body.password;
    var password = bcrypt.hashSync(pass, salt);

  // console.log(req.body.name+"   "+req.body.username+"    "+req.body.password);
       
  User.findOne({where:{
    [Op.or]: [{username: username}]
  }
    }).then(function(user) {
      if (user) {
        res.send('user already taken'+ JSON.stringify(user));
        console.log('user already taken'+ JSON.stringify(user));

      } 
      else{
 
          User.create({
            name:name,
            username:username,
            password:password,
           
          })
          .then(function(user) {
                // res.send('user created'+ JSON.stringify(user));
                console.log('user created'+ JSON.stringify(user));
                console.log('success');
               let currentUser = encodeURIComponent(user.name);
             return  res.redirect('/dashboard/?currentUser='+currentUser)

            })
            .catch(function(err) {
                // print the error details
                console.log(err);
              });

        

          }
          
        })
        .catch(function(err){
            res.send(err);
            console.log(err);
        })
       
  });

  module.exports = router;