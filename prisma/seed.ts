import { PrismaClient } from '@prisma/client'
import { build, fake } from '@jackfranklin/test-data-bot'

const db = new PrismaClient()

interface User {
  name: string
  email: string
}

interface Sleep {
  start: Date
  end: Date
}

const userBuilder = build<User>('User', {
  fields: {
    email: fake((f) => f.internet.email()),
    name: fake((f) => f.name.findName()),
  },
})

const sleepBuilder = build<Sleep>('Sleep', {
  fields: {
    start: fake((f) => f.date.past()),
    end: fake((f) => f.date.future()),
  },
})

async function seed() {
  const users = Promise.all(
    Array.from({ length: 10 }, userBuilder).map((user) => db.user.create({ data: user }))
  )
  users.then((users) => {
    return Promise.all(
      Array.from({ length: 10 }, sleepBuilder).map((sleep) =>
        db.sleep.create({
          data: {
            ...sleep,
            user: { connect: { id: users[Math.floor(Math.random() * users.length)].id } },
          },
        })
      )
    )
  })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
