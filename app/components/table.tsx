import * as React from 'react'
import { useTable } from 'react-table'
import leftIcon from '../icons/left.svg'
import rightIcon from '../icons/right.svg'
interface TableData {
  id: string
  date: string
  timeOfSleep: string
  timeOfWake: string
  sleepDuration: string
}

export default function Table({ data }: { data: TableData[] }) {
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
        accessor: 'timeOfWake',
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
    data,
  })
  return (
    <>
      <div className="h-14 pl-4 border-b-2 border-opacity-40 dark:border-gray-600 flex items-center">
        <h3 className="text-lg font-bold">Sleep Stats</h3>
      </div>
      <div className="flex flex-col justify-between" style={{ height: 'calc(100% - 4rem)' }}>
        <table className="w-full" {...getTableProps()}>
          <thead className="border-b-2 border-opacity-40 dark:border-gray-600 h-10">
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
                  className="h-11 border-b-2 border-opacity-40 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
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
            <span> of {data.length}</span>
          </div>
          <div className="flex">
            <button className="items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-l flex">
              <img src={leftIcon} width={14} className="mr-2" />
              <span className="hidden lg:block">Prev</span>
            </button>
            <button className="items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-r flex">
              <span className="hidden lg:block">Next</span>
              <img src={rightIcon} width={14} className="ml-2" />
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
  <select className="w-20 h-10 border-2 rounded dark:bg-gray-800 dark:border-gray-700" {...props}>
    {[10, 20, 30, 40, 50].map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </select>
)
