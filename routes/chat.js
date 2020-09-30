var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
const Op = Sequelize.Op;

 var chat = require('../models/chat')

// router.post('/chat',function (req,res) {

//     console.log("Inside chat route    "+JSON.stringify(req.body));
    
//     chat.findOne({
//       where:{

//       currentUser:  {
//           [Op.or]: [req.body.currentUser,req.body.name]
//         },
//       name : { [Op.or]: [req.body.currentUser, req.body.name]
//        }

//       }
//     }).then(function (params) {
       
//       //  console.log(params);
//        if (params) {

//          console.log('aleready found in database');
//          console.log(params.dataValues.chat);
//          var newChat = params.dataValues.chat +"%"+req.body.chat ;

//          chat.update({
//            chat:newChat 
           
//          },
//          {
//            where:{ 
//               currentUser:  {
//                   [Op.or]: [req.body.currentUser,req.body.name]
//                 },
//               name : { [Op.or]: [req.body.currentUser, req.body.name]
//               }
//            }
//         }).then(function (params) {
          
//           res.json(params)
//         })
        
//        }

//        else{

//              chat.create({ 
//                   currentUser: req.body.currentUser,
//                   name: req.body.name,
//                   chat: req.body.chat 

//               }).then(function (params) {
//                   // console.log(params);
//                 console.log('Not aleready found in db');
                 
//                   res.json(params);
//               })

//           }
//     })

      
// })




   router.post('/chat',function (req,res) {
  
                 chat.create({ 

                      currentUser: req.body.currentUser,
                      name: req.body.name,
                      chat: req.body.chat 
    
                  }).then(function (params) {

                    //   console.log(params);   

                      res.json(params);

                  })

   })


module.exports = router ;
