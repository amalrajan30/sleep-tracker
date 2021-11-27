import * as React from 'react'
import { Form } from 'remix'
import Dialog from '@reach/dialog'
import { AiOutlineClose } from 'react-icons/ai'
import differenceInHours from 'date-fns/differenceInHours'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function NewEntry({ isOpen, onClose }: Props) {
  const [sleepTime, setSleepTime] = React.useState<Date | undefined>()
  const [wakeUpTime, setWakeUpTime] = React.useState<Date | undefined>()
  const [duration, setDuration] = React.useState('')

  React.useEffect(() => {
    if (sleepTime && wakeUpTime) {
      setDuration(
        differenceInHours(new Date(wakeUpTime), new Date(sleepTime), { roundingMethod: 'round' }) +
          ' hrs'
      )
    }
  }, [sleepTime, wakeUpTime])

  return (
    <Dialog aria-label="new entry form" className="rounded p-0" isOpen={isOpen} onDismiss={onClose}>
      <div className="h-10 flex items-center justify-between border-b-2 p-8 border-gray-100">
        <h1 className="font-bold text-xl">New Entry</h1>
        <button onClick={onClose}>
          <AiOutlineClose className="h-5 font-bold" />
        </button>
      </div>
      <div className="p-8">
        <Form method="post">
          <InputGroup label="Date" name="date">
            <input type="date" required={true} name="date" placeholder="Date" />
          </InputGroup>
          <InputGroup label="Sleep Time" name="sleepTime">
            <input
              type="time"
              required={true}
              className="w-full"
              onChange={(e) =>
                setSleepTime(
                  new Date(
                    2012,
                    11,
                    10,
                    Number(e.target.value.split(':')[0]),
                    Number(e.target.value.split(':')[1])
                  )
                )
              }
              name="sleepTime"
              id="sleepTime"
            />
          </InputGroup>
          <InputGroup label="Wake Up Time" name="wakeUpTime">
            <input
              type="time"
              required={true}
              className="w-full"
              onChange={(e) =>
                setWakeUpTime(
                  new Date(
                    2012,
                    11,
                    10,
                    Number(e.target.value.split(':')[0]),
                    Number(e.target.value.split(':')[1])
                  )
                )
              }
              name="wakeUpTime"
              id="wakeUpTime"
            />
          </InputGroup>

          <InputGroup label="Duration" name="duration">
            <input type="text" name="duration" value={duration} disabled />
          </InputGroup>

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
    <label htmlFor={name} className="text-gray-700 text-sm font-bold">
      {label}
    </label>
    {children}
  </div>
)
