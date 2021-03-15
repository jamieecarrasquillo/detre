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
  },
  creatorImage: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue:
      'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png'
  }
})

module.exports = Room
