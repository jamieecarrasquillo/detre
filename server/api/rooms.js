const router = require('express').Router()
const {User, Room} = require('../db/models')
module.exports = router

// GET all rooms
// ROUTE /api/rooms
router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll()
    res.json(rooms)
  } catch (err) {
    next(err)
  }
})

// GET single room
// ROUTE /api/rooms/:roomId
router.get('/:roomId', async (req, res, next) => {
  try {
    let room = await Room.findByPk(req.params.roomId)
    res.json(room)
  } catch (err) {
    next(err)
  }
})

// POST create new room and new room's id
// ROUTE /api/rooms
// returns roomId
router.post('/', async (req, res, next) => {
  try {
    let {title, description, category, hashtags} = req.body
    let creatorId = req.user.id
    let creatorImage = req.user.profilePicture
    let newRoom = await Room.create({
      title,
      description,
      category,
      hashtags,
      creatorId,
      creatorImage
    })

    const user = await User.findOne({where: {id: req.user.id}})
    user.speaker = true
    await user.save()

    res.json(newRoom)
  } catch (err) {
    next(err)
  }
})

// PUT user joins single room
// ROUTE /api/rooms/:roomId
router.put('/:roomId', async (req, res, next) => {
  try {
    let roomUserWantsToJoin = await Room.findByPk(req.params.roomId)
    let user = req.user.id
    user.joinedRoomId = roomUserWantsToJoin
    res.json(roomUserWantsToJoin)
  } catch (err) {
    next(err)
  }
})

// // PUT user unjoin single room
// // ROUTE /api/rooms/unjoin/:roomId
router.put('/unjoin/:roomId', async (req, res, next) => {
  try {
    let roomUserWantsToUnjoin = await Room.findByPk(req.params.roomId)
    let user = req.user.id
    user.joinedRoomId = null
    res.json(roomUserWantsToUnjoin)
  } catch (err) {
    next(err)
  }
})

// DELETE room
// ROUTE api/rooms/roomId
router.delete('/:roomId', async (req, res, next) => {
  try {
    let room = await Room.findByPk(req.params.roomId)
    if (!room) {
      res.sendStatus(404)
    } else {
      await room.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
