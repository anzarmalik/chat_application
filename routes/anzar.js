var express = require('express');
var router = express.Router();
var chat = require('../models/chat')
/* GET home page. */
var Sequelize = require('sequelize')
const Op = Sequelize.Op;


router.post('/anzar', function(req, res, next) {
  //  console.log("about your name  "+req.body.currentUser);
  
   chat.findAll({    
      where:{
              currentUser: {
                    [Op.or]: [req.body.currentUser,req.body.users]
                       },
              name : { 
                [Op.or]: [req.body.currentUser, req.body.users]
              }
          } 
   }).then(function (params) {
         var data1=[] ;
        //  console.log(params);
        for (let index = 0; index < params.length; index++) {
          // console.log(params[index].dataValues.currentUser);
          // console.log(params[index].dataValues.name);
          var dataAppended = params[index].dataValues.chat +"~^`^~"+params[index].dataValues.currentUser+"~^`^~"+params[index].dataValues.name ;
          data1.push(dataAppended);       
        }
            
            
          //   var mySubString = data1[0].substring(
          //     data1[0].indexOf("~"), 
          //     data1[0].indexOf("^")
          //   );
           
          // console.log(mySubString);
          // console.log(mySubString.slice(1));

          
        // chat.findAll({    
        //         where:{
        //           currentUser:req.body.users,
        //           name:req.body.currentUser
        //         }
        //   }).then(function (params) {
        //           var data2=[] ;
        //            console.log(params);
        //           for (let index = 0; index < params.length; index++) {
        //             data2.push(params[index].dataValues.chat);       
        //           }
                  
                  // res.render('anzar',{data1:data1,data2:data2,user:req.body.users,currentUser:req.body.currentUser});
              // })

         res.render('anzar',{data1:data1,user:req.body.users,currentUser:req.body.currentUser});
     
     })
  
});

module.exports = router;
