
// establishing connection
const Sequelize = require('sequelize')
const dbConfig = require('./config.json').local
// variable to create an object for conn
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

sequelize.sync({ force: false })

module.exports = sequelize