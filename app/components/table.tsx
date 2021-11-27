import * as React from 'react'
import { useTable } from 'react-table'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'

export default function Table() {
  const dummyData = React.useMemo(
    () => [
      {
        id: 1,
        date: '2020-01-01',
        timeOfSleep: '10:00',
        timeOfWakeup: '11:00',
        sleepDuration: '6 hrs',
      },
      {
        id: 2,
        date: '2020-01-02',
        timeOfSleep: '10:00',
        timeOfWakeup: '11:00',
        sleepDuration: '6 hrs',
      },
      {
        id: 3,
        date: '2020-01-03',
        timeOfSleep: '10:00',
        timeOfWakeup: '11:00',
        sleepDuration: '6 hrs',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Time of sleep',
        accessor: 'timeOfSleep',
      },
      {
        Header: 'Time of wakeup',
        accessor: 'timeOfWakeup',
      },
      {
        Header: 'Sleep Duration',
        accessor: 'sleepDuration',
      },
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    //@ts-ignore
    columns,
    data: dummyData,
  })
  return (
    <>
      <div className="h-14 pl-4 border-b-2 border-opacity-40 flex items-center">
        <h3 className="text-lg font-bold">Sleep Stats</h3>
      </div>
      <div className="flex flex-col justify-between" style={{height: 'calc(100% - 4rem)'}}>
        <table className="w-full" {...getTableProps()}>
          <thead className="border-b-2 border-opacity-40 h-10">
            {headerGroups.map((headerGroup) => (
              <tr className="text-gray-400 text-sm" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr
                  className="h-11 border-b-2 border-opacity-40 hover:bg-gray-100"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td className="text-center" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-4 pb-4 mt-5 flex justify-between items-center">
          <div className="text-gray-400 font-semibold">
            <span>Showing </span>
            <Menu onChange={(e) => console.log(e.target.value)} value={10} />
            <span> of {dummyData.length}</span>
          </div>
          <div className="flex">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-l flex">
              <GrFormPrevious className="mr-4" /> Prev
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-r flex">
              Next <GrFormNext className="ml-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

type MenuProps = {
  value: number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Menu = (props: MenuProps) => (
  <select className="w-20 h-10 border-2 rounded" {...props}>
    {[10, 20, 30, 40, 50].map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </select>
)
