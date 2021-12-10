import { db } from './db.server'

interface SleepEntry {
  start: Date
  end: Date
  userId: string
}

export async function createSleepEntry(entry: SleepEntry) {
  const result = await db.sleep.create({ data: entry })
  return result
}

export async function getSleepEntries(userId: string) {
  const result = await db.sleep.findMany({
    where: { userId },
  })
  return result
}
