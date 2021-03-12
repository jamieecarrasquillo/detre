const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hashtags: {
    type: Sequelize.STRING
  }
})

module.exports = Room
