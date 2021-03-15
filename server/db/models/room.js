const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'Please enter a title.'
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'Please enter a description.'
      }
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'Please enter a category.'
      }
    }
  },
  hashtags: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'Please enter at least one hashtag.'
      }
    }
  }
})

module.exports = Room
