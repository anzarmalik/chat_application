'use strict'
var Sequelize = require('sequelize')
var sequelize = require('../db/config')


var chat  =sequelize.define('chat',{
    userId:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    currentUser:Sequelize.STRING  ,
    name:{type:Sequelize.STRING },

    chat:{
        type:Sequelize.TEXT
    }

})

module.exports = chat ; 