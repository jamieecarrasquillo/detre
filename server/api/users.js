const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// Admin has access to edit and remove the user
const isAdmin = (req, res, next) => {
  return req.user.isAdmin
    ? next()
    : res.status(200).send('You do not have admin access')
}

// GET all users
// ROUTE /users/
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'name',
        'email',
        'username',
        'profilePicture',
        'website',
        'bio',
        'isAdmin'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// POST create user
// api/user/
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const user = req.user.id

    let {
      name,
      email,
      password,
      username,
      profilePicture,
      website,
      bio,
      isAdmin
    } = req.body

    let newUser = await User.create({
      name,
      email,
      password,
      username,
      profilePicture,
      website,
      bio,
      isAdmin
    })
    res.json(newUser).status(200)
  } catch (err) {
    next(err)
  }
})

// PUT edit user
// api/user/
router.put('/', isAdmin, async (req, res, next) => {
  try {
    const user = req.user.id

    let {
      name,
      email,
      password,
      username,
      profilePicture,
      website,
      bio
    } = req.body

    let updatedUser = await User.update({
      name,
      email,
      password,
      username,
      profilePicture,
      website,
      bio
    })
    res.json(updatedUser).status(200)
  } catch (err) {
    next(err)
  }
})

// DELETE user
// ROUTE api/user/
router.delete('/', isAdmin, async (req, res, next) => {
  try {
    let user = req.user.id
    if (!user) {
      res.sendStatus(404)
    } else {
      await user.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
