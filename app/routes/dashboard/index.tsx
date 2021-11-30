import { LinksFunction, ActionFunction } from 'remix'
import * as React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import datepickerStyleHref from 'react-datepicker/dist/react-datepicker.css'
import Graph from '~/components/graph'
import InfoCard from '~/components/infoCard'
import Summary from '~/components/summary'
import Table from '~/components/table'
import NewEntry from '~/components/newEntry'

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
  console.log(body)
  return null
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={open}
          className="flex bg-indigo-500 hover:bg-indigo-700 p-2 rounded text-white"
        >
          <AiOutlinePlus className="text-white" />
          <span>New Entry</span>
        </button>
      </div>

      <div className="mt-8 grid grid-cols-dashboard grid-rows-dashboard gap-4">
        <div className="bg-white col-start-1 col-end-2 row-span-2 shadow-xl rounded">
          <Table />
        </div>
        {/* <div className="bg-white shadow-xl p-4 rounded">
          <InfoCard value="6 hrs" title="Avg Sleep Time" />
        </div>
        <div className="bg-white shadow-xl p-4 rounded">
          <InfoCard value="06:00" title="Avg Wake Up Time" />
        </div> */}
        <div className="bg-white col-span-1 p-4 h-72 shadow-xl rounded">
          <h3 className="font-bold text-xl">Sleep Duration</h3>
          <Graph />
        </div>
        <div className="bg-white col-span-1 p-4 row-span-1 shadow-xl rounded">
          <h3 className="font-bold text-xl">Additional Infos</h3>
          <Summary />
        </div>
      </div>

      <NewEntry isOpen={isOpen} onClose={close} />
    </main>
  )
}
