'use strict'

const db = require('../server/db')
const {User, Room, Listeners, Speakers} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Jamie Eunice',
      email: 'jamie@email.com',
      password: '123',
      username: 'jeimiyuniseu',
      profilePicture:
        'https://media-exp1.licdn.com/dms/image/C4E03AQGr2JhwHUAbXg/profile-displayphoto-shrink_400_400/0/1593014512052?e=1619654400&v=beta&t=md-8FwRQqKxWwMj259C9iOXYBHycHeBp94YqDEvQPTI',
      website: 'google.com',
      bio: `ᨏ☼ isleña puerto rico
        full-stack software engineer
        aussie mom @kyloanddrogo`,
      joinedRoomId: 1,
      isAdmin: true,
      speaker: true,
      listener: false
    }),
    User.create({
      name: 'Jon Ros',
      email: 'jon@email.com',
      password: '123',
      username: 'jonrolu',
      profilePicture:
        'https://www.vippng.com/png/detail/363-3631840_profile-icon-png-profile-icon-png-white-transparent.png',
      website: 'google.com',
      bio: 'Friendly pal.',
      joinedRoomId: 1,
      isAdmin: false,
      speaker: false,
      listener: true
    })
  ])

  const rooms = await Promise.all([
    Room.create({
      title: 'Entrepreneurship Standarts',
      description: `Come chat about the current events happening all over the south east of the United States. These have affected all of us in different ways and we are all sure to benefit from sharing our stories. 
      
      Please be aware that we enforce community rules:
      * No harresment of any kind
      * No speaking unless given the chance
      * No spamming messages`,
      category: 'business',
      hashtags: '#wealth',
      creatorId: 1
    }),
    Room.create({
      title: 'Modern Self-Love',
      description: `Come chat about the current trends happening all over the self love community.

      Please be aware that we enforce community rules:
      * No harresment of any kind
      * No speaking unless given the chance
      * No spamming messages`,
      category: 'self care',
      hashtags: '#selflove',
      creatorId: 1
    }),
    Room.create({
      title: 'Skincare Myths',
      description: `Come chat about the current myths that exist all over the skincare community. 
      
      Please be aware that we enforce community rules:
      * No harresment of any kind
      * No speaking unless given the chance
      * No spamming messages`,
      category: 'self care',
      hashtags: '#selflove',
      creatorId: 1
    }),
    Room.create({
      title: 'Relationship Quo',
      description: `Come chat about the current behaviors that have helped relationships the most in this modern times. 
      
      Please be aware that we enforce community rules:
      * No harresment of any kind
      * No speaking unless given the chance
      * No spamming messages`,
      category: 'marriage',
      hashtags: '#love',
      creatorId: 1
    }),
    Room.create({
      title: 'Women in Tech',
      description: `Come chat about the current environment that women in tech go through.
      
      Please be aware that we enforce community rules:
      * No harresment of any kind
      * No speaking unless given the chance
      * No spamming messages`,
      category: 'technology',
      hashtags: '#womencancode',
      creatorId: 1
    }),
    Room.create({
      title: 'Female and Male Energy',
      description: `Come chat about the current events happening all over the south east of the United
      States. These wheather conditions have affected all of us in different ways and we are
      all sure to benefit from sharing our stories. 
      
      Please be aware that we enforce community rules:
      * No harresment of any kind
      * No speaking unless given the chance
      * No spamming messages`,
      category: 'psycology',
      hashtags: '#energy',
      creatorId: 1
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
