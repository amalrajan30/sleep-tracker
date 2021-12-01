import { createCookieSessionStorage, redirect } from 'remix'

import { db } from './db.server'

async function checkExistingUser(email: string) {
  const user = await db.user.findFirst({ where: { email } })
  return user ? user.id : null
}

export async function createUser(email: string, name: string, avatar: string) {
  const userId = await checkExistingUser(email)
  if (userId) {
    return userId
  }
  const user = await db.user.create({ data: { email, name, avatar } })
  return user.id
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'ST_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET || 'default-secret'],
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    httpOnly: true,
  },
})

export async function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('cookie'))
}

export async function setUserSession(userId: string, name: string, avatar: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  session.set('name', name)
  session.set('avatar', avatar)
  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}
