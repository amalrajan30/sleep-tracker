import { LinksFunction, ActionFunction, LoaderFunction, redirect, useLoaderData } from 'remix'
import * as React from 'react'
import differenceInHours from 'date-fns/differenceInHours'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'
import datepickerStyleHref from 'react-datepicker/dist/react-datepicker.css'
import Graph from '~/components/graph'
import Summary from '~/components/summary'
import Table from '~/components/table'
import NewEntry from '~/components/newEntry'
import { getUserSession } from '~/utils/session.server'
import { createSleepEntry, getSleepEntries } from '~/utils/sleepEntries.server'
import addIcon from '../../icons/add.svg'
import { da } from 'date-fns/locale'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/@reach/dialog@0.16.2/styles.css',
  },
  {
    rel: 'stylesheet',
    href: datepickerStyleHref,
  },
]

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()
  const date = body.get('date')
  const sleepTime = body.get('sleepTime')
  const overNight = body.get('overnight')
  const wakeUpTime = body.get('wakeUpTime')
  const timezone = body.get('timezone')
  if (
    typeof date !== 'string' ||
    typeof sleepTime !== 'string' ||
    typeof wakeUpTime !== 'string' ||
    typeof timezone !== 'string'
  ) {
    return { formError: 'Please fill out all fields' }
  }
  const session = await getUserSession(request)
  const sleepTimeDate = new Date(`${date}T${sleepTime}`)
  let wakeUpTimeDate = new Date(`${date}T${wakeUpTime}`)
  if (overNight === 'on') {
    wakeUpTimeDate = new Date(wakeUpTimeDate.setDate(wakeUpTimeDate.getDate() + 1))
  }
  console.log('wakeUpTimeDate', wakeUpTimeDate.toISOString())
  if (session.has('userId')) {
    const userId = session.get('userId')
    await createSleepEntry({
      userId,
      end: zonedTimeToUtc(wakeUpTimeDate, timezone),
      start: zonedTimeToUtc(sleepTimeDate, timezone),
    })
    return null
  } else {
    return redirect('/login')
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request)
  if (session.has('userId')) {
    const userId = session.get('userId')
    const sleepEntries = await getSleepEntries(userId)
    return { sleepEntries }
  }
  return redirect('/login')
}

interface SleepEntry {
  end: string
  start: string
  id: string
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(false)

  const { sleepEntries } = useLoaderData() as { sleepEntries: SleepEntry[] }

  function findAverageTime(entries: string[]) {
    const sum = entries.reduce((acc, curr) => {
      const date = new Date(curr)
      const time = Number(`${date.getHours()}.${date.getMinutes()}`)
      return acc + time
    }, 0)

    const average = (sum / entries.length).toFixed(2)
    const averageDate = new Date(
      0,
      0,
      0,
      Number(average.toString().split('.')[0]),
      Number(average.toString().split('.')[1])
    )
    return averageDate.toLocaleTimeString().replace(/:\d+ /, ' ')
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const generateTableData = React.useCallback(() => {
    return sleepEntries.map((entry: SleepEntry) => {
      const startTime = utcToZonedTime(entry.start, timezone)
      const endTime = utcToZonedTime(entry.end, timezone)
      const date = startTime.toLocaleDateString()
      const start = startTime.toLocaleTimeString().replace(/:\d\d /, ' ')
      const end = endTime.toLocaleTimeString().replace(/:\d\d /, ' ')
      const duration = differenceInHours(endTime, startTime)
      return {
        date,
        timeOfSleep: start,
        timeOfWake: end,
        id: entry.id,
        sleepDuration: `${duration} hours`,
      }
    })
  }, [sleepEntries])

  const generateGraphData = React.useCallback(() => {
    return sleepEntries.map((entry: SleepEntry) => {
      const startTime = utcToZonedTime(entry.start, timezone)
      const endTime = utcToZonedTime(entry.end, timezone)
      const duration = differenceInHours(endTime, startTime)
      return {
        date: `${startTime.getDate()}/${startTime.getMonth() + 1}`,
        hours: duration,
      }
    })
  }, [sleepEntries])

  const generateSummaryData = React.useCallback(() => {
    const avgSleepTime = findAverageTime(sleepEntries.map((entry: SleepEntry) => entry.start))
    const avgWakeTime = findAverageTime(sleepEntries.map((entry: SleepEntry) => entry.end))

    const avgSleepDuration =
      sleepEntries.reduce((acc, curr) => {
        const startTime = utcToZonedTime(curr.start, timezone)
        const endTime = utcToZonedTime(curr.end, timezone)
        const duration = differenceInHours(endTime, startTime)
        return acc + duration
      }, 0) / sleepEntries.length
    const daysLessThan6Hours = sleepEntries.filter((entry: SleepEntry) => {
      const startTime = utcToZonedTime(entry.start, timezone)
      const endTime = utcToZonedTime(entry.end, timezone)
      const duration = differenceInHours(endTime, startTime)
      return duration < 6
    }).length
    const daysMoreThan8Hours = sleepEntries.filter((entry: SleepEntry) => {
      const startTime = utcToZonedTime(entry.start, timezone)
      const endTime = utcToZonedTime(entry.end, timezone)
      const duration = differenceInHours(endTime, startTime)
      return duration > 8
    }).length
    return {
      avgSleepTime,
      avgWakeTime,
      avgSleepDuration,
      daysLessThan6Hours,
      daysMoreThan8Hours,
    }
  }, [sleepEntries])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-gray-200">Dashboard</h1>
        <button
          onClick={open}
          className="hidden md:flex items-center bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-900 p-2 rounded text-white"
        >
          <span className="text-white mr-2">
            <img src={addIcon} alt="add" width={16} />
          </span>
          <span>New Entry</span>
        </button>
        <button
          onClick={open}
          className="flex md:hidden z-10 rounded-full w-10 h-10 items-center justify-center absolute bottom-14 right-9 drop-shadow-lg bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-900 p-2 text-white"
        >
          <img src={addIcon} alt="add" width={16} />
        </button>
      </div>

      <div className="mt-8 dashboard">
        <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 col-start-1 col-end-2 row-span-2 shadow-xl rounded">
          <Table data={generateTableData()} />
        </div>
        <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 col-span-1 p-4 h-72 shadow-xl rounded">
          <h3 className="font-bold text-xl">Sleep Duration</h3>
          <Graph data={generateGraphData()} />
        </div>
        <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 col-span-1 p-4 row-span-1 shadow-xl rounded">
          <h3 className="font-bold text-xl">Additional Infos</h3>
          <Summary data={generateSummaryData()} />
        </div>
      </div>

      <NewEntry isOpen={isOpen} onClose={close} />
    </main>
  )
}
