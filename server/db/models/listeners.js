const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Listeners = db.define('listeners', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  profilePicture: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'https://www.vippng.com/png/detail/363-3631840_profile-icon-png-profile-icon-png-white-transparent.png'
  },
  website: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = Listeners

/**
 * instanceMethods
 */
Listeners.prototype.correctPassword = function(candidatePwd) {
  return (
    Listeners.encryptPassword(candidatePwd, this.salt()) === this.password()
  )
}

/**
 * classMethods
 */
Listeners.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Listeners.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = listener => {
  if (listener.changed('password')) {
    listener.salt = Listeners.generateSalt()
    listener.password = Listeners.encryptPassword(
      listener.password(),
      listener.salt()
    )
  }
}

Listeners.beforeCreate(setSaltAndPassword)
Listeners.beforeUpdate(setSaltAndPassword)
Listeners.beforeBulkCreate(listeners => {
  listeners.forEach(setSaltAndPassword)
})
