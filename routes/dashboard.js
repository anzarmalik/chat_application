var express = require('express');
var router = express.Router();

var User =require('../models/login');
var ensure = require('./../utils/ensure')



router.get('/dashboard',ensure,(req,res)=>{
    var currentUser = req.query.currentUser;
    // console.log(currentUser);
    
   var data =[];
    User.findAll().then((obj)=>{
        // console.log(obj);
        
        for (let index = 0; index < obj.length; index++) {

            // console.log(obj[index].dataValues.name);
            if (obj[index].dataValues.name!=currentUser) {
            data.push(obj[index].dataValues.name);
                
            }
        }
        res.render('dashboard',{data:data,currentUser:currentUser});
          
        })

})

module.exports = router;