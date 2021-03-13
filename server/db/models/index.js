const User = require('./user')
const Room = require('./room')

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

Room.belongsTo(User, {as: 'roomCreator', foreignKey: 'creatorId'})
//Methods that get created by this association:
// "getUser", "setUser", and "createUser"

User.belongsTo(Room, {
  as: 'userWhoJoined',
  foreignKey: 'joinedRoomId',
  constraints: false
})
//Methods that get created by this association:
// "getRoom", "setRoom", and "createRoom"

User.hasMany(Room, {as: 'roomCreator'})
// Methods that get created by this association:
// "getRooms", "setRooms", "createRoom", "addRoom", "addRooms",
// "removeRoom", "removeRooms", "hasRoom", "hasRooms", "countRooms"
// (because we defined Owner.hasMany(Pug)).

module.exports = {
  User,
  Room
}
