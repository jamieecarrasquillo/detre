const User = require('./user')
const Room = require('./room')
const Listeners = require('./listeners')
const Speakers = require('./speakers')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Room)
Room.belongsTo(User)
Listeners.belongsToMany(Room, {through: 'room-listeners'})
Speakers.belongsToMany(Room, {through: 'room-speakers'})
Room.belongsToMany(Listeners, {through: 'room-listeners'})
Room.belongsToMany(Speakers, {through: 'room-speakers'})

module.exports = {
  User,
  Room,
  Listeners,
  Speakers
}
