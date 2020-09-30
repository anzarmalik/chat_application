'use strict'
var Sequelize = require('sequelize')
var sequelize = require('../db/config')


var user =sequelize.define('user',{
    userId:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING  ,
    username:{type:Sequelize.STRING,
        unique:true
    },
    password:Sequelize.STRING,
    // email: {
    //     type:Sequelize.STRING,
    //     unique:true  
    // }

})

module.exports = user