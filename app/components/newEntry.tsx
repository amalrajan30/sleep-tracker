import * as React from 'react'
import { Form } from 'remix'
import Dialog from '@reach/dialog'
import closeIcon from '../icons/close.svg'
import differenceInHours from 'date-fns/differenceInHours'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function NewEntry({ isOpen, onClose }: Props) {
  const [date, setDate] = React.useState<string | undefined>()
  const [sleepTime, setSleepTime] = React.useState<string | undefined>()
  const [wakeUpTime, setWakeUpTime] = React.useState<string | undefined>()
  const [overNight, setOverNight] = React.useState<string | undefined>()
  const [duration, setDuration] = React.useState('')

  React.useEffect(() => {
    if (date && sleepTime && wakeUpTime) {
      const sleepTimeDate = new Date(`${date}T${sleepTime}`)
      let wakeUpTimeDate = new Date(`${date}T${wakeUpTime}`)
      if (overNight === 'on') {
        wakeUpTimeDate = new Date(wakeUpTimeDate.setDate(wakeUpTimeDate.getDate() + 1))
      }
      console.log('wakeUpTimeDate', wakeUpTimeDate.toISOString())
      const duration = differenceInHours(wakeUpTimeDate, sleepTimeDate)
      if (duration > 0) {
        setDuration(`${duration}h`)
      } else {
        setDuration('')
      }
    }
  }, [sleepTime, wakeUpTime, overNight, date])

  return (
    <Dialog
      aria-label="new entry form"
      className="rounded p-0 bg-white dark:bg-gray-900"
      isOpen={isOpen}
      onDismiss={onClose}
    >
      <div className="h-10 flex items-center justify-between border-b-2 p-8 border-gray-100 dark:border-gray-700 text-gray-200 dark:bg-gray-900">
        <h1 className="font-bold text-xl">New Entry</h1>
        <button onClick={onClose}>
          <img src={closeIcon} width={16} />
        </button>
      </div>
      <div className="p-8 dark:bg-gray-900">
        <Form method="post">
          <InputGroup label="Date" name="date">
            <input
              type="date"
              required={true}
              name="date"
              className="dark:bg-gray-400 dark:text-gray-700"
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
            />
          </InputGroup>
          <InputGroup label="Sleep Time" name="sleepTime">
            <input
              type="time"
              required={true}
              className="w-full dark:bg-gray-400"
              onChange={(e) => setSleepTime(e.target.value)}
              name="sleepTime"
              id="sleepTime"
            />
          </InputGroup>
          <InputGroup label="Wake Up Time" name="wakeUpTime">
            <input
              type="time"
              required={true}
              disabled={!sleepTime}
              min={overNight ? '00:00' : sleepTime}
              className="w-full dark:bg-gray-400"
              onChange={(e) => setWakeUpTime(e.target.value)}
              name="wakeUpTime"
              id="wakeUpTime"
            />
          </InputGroup>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="overnight"
              id="overnight"
              onChange={(e) => {
                setOverNight(e.target.checked ? 'on' : undefined)
              }}
            />
            <label
              htmlFor="overnight"
              className="text-gray-700 dark:text-gray-400 text-sm font-bold ml-3"
            >
              Did you sleep overnight?
            </label>
          </div>

          <InputGroup label="Duration" name="duration">
            <input
              type="text"
              name="duration"
              className="dark:bg-gray-400 dark:text-gray-700"
              value={duration}
              disabled
            />
          </InputGroup>

          <input
            type="hidden"
            name="timezone"
            value={Intl.DateTimeFormat().resolvedOptions().timeZone}
          />

          <div className="flex justify-end mt-4">
            <input
              type="reset"
              className="ml-3 bg-gray-500 hover:bg-gray-700 w-16 p-2 rounded text-white cursor-pointer"
            />
            <button
              onClick={onClose}
              className="ml-3 bg-gray-500 hover:bg-gray-700 w-16 p-2 rounded text-white"
            >
              Cancel
            </button>
            <input
              type="submit"
              className="ml-3 bg-indigo-500 hover:bg-indigo-700 w-16 p-2 rounded text-white cursor-pointer"
            />
          </div>
        </Form>
      </div>
    </Dialog>
  )
}

const InputGroup = ({
  label,
  name,
  children,
}: {
  label: string
  name: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col justify-between mb-4">
    <label htmlFor={name} className="text-gray-700 dark:text-gray-400 text-sm font-bold">
      {label}
    </label>
    {children}
  </div>
)
