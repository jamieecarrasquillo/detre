'use strict'

const db = require('../server/db')
const {User, Room, Listeners, Speakers} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Jamie Eunice',
      email: 'cody@email.com',
      password: '123',
      username: 'jeimiyuniseu',
      profilePicture:
        'https://media-exp1.licdn.com/dms/image/C4E03AQGr2JhwHUAbXg/profile-displayphoto-shrink_400_400/0/1593014512052?e=1619654400&v=beta&t=md-8FwRQqKxWwMj259C9iOXYBHycHeBp94YqDEvQPTI',
      website: 'google.com',
      bio:
        'ᨏ☼ isleña puerto rico \n full-stack software engineer \n aussie mom kyloanddrogo'
    }),
    User.create({
      name: 'Murphy Cesar',
      email: 'murphy@email.com',
      password: '123',
      username: 'morphedbutterfly',
      profilePicture:
        'https://www.vippng.com/png/detail/363-3631840_profile-icon-png-profile-icon-png-white-transparent.png',
      website: 'google.com',
      bio: 'Friendly gal.'
    })
  ])

  const rooms = await Promise.all([
    Room.create({
      title: 'The Ways of Entrepreneurship',
      description: 'Come listen fellow creative and hard working minds.',
      userId: 1
    }),
    Room.create({
      title: 'Value in todays world',
      description: 'Bloom like a butterfly, the time is now.',
      userId: 2
    })
  ])

  const listeners = await Promise.all([
    Listeners.create({
      name: 'Jamie Eunice',
      email: 'cody@email.com',
      password: '123',
      username: 'jeimiyuniseu',
      profilePicture:
        'https://media-exp1.licdn.com/dms/image/C4E03AQGr2JhwHUAbXg/profile-displayphoto-shrink_400_400/0/1593014512052?e=1619654400&v=beta&t=md-8FwRQqKxWwMj259C9iOXYBHycHeBp94YqDEvQPTI',
      website: 'google.com',
      bio:
        'ᨏ☼ isleña puerto rico \n full-stack software engineer \n aussie mom kyloanddrogo'
    }),
    Listeners.create({
      name: 'Murphy Cesar',
      email: 'murphy@email.com',
      password: '123',
      username: 'morphedbutterfly',
      profilePicture:
        'https://www.vippng.com/png/detail/363-3631840_profile-icon-png-profile-icon-png-white-transparent.png',
      website: 'google.com',
      bio: 'Friendly gal.'
    })
  ])

  const speakers = await Promise.all([
    Speakers.create({
      name: 'Jamie Eunice',
      email: 'cody@email.com',
      password: '123',
      username: 'jeimiyuniseu',
      profilePicture:
        'https://media-exp1.licdn.com/dms/image/C4E03AQGr2JhwHUAbXg/profile-displayphoto-shrink_400_400/0/1593014512052?e=1619654400&v=beta&t=md-8FwRQqKxWwMj259C9iOXYBHycHeBp94YqDEvQPTI',
      website: 'google.com',
      bio:
        'ᨏ☼ isleña puerto rico \n full-stack software engineer \n aussie mom kyloanddrogo'
    }),
    Speakers.create({
      name: 'Murphy Cesar',
      email: 'murphy@email.com',
      password: '123',
      username: 'morphedbutterfly',
      profilePicture:
        'https://www.vippng.com/png/detail/363-3631840_profile-icon-png-profile-icon-png-white-transparent.png',
      website: 'google.com',
      bio: 'Friendly gal.'
    })
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
