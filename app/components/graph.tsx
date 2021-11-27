import * as React from 'react'
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

type DailySleep = {
  date: string
  hours: number
}

type SleepData = {
  label: string
  data: DailySleep[]
}

export default function Graph() {
  const data = React.useMemo(
    (): DailySleep[] => [
      { date: '01/11', hours: 2 },
      { date: '02/11', hours: 5 },
      { date: '03/11', hours: 7 },
      { date: '04/11', hours: 8 },
      { date: '05/11', hours: 6 },
      { date: '06/11', hours: 8 },
      { date: '07/11', hours: 4 },
      { date: '08/11', hours: 5 },
    ],
    []
  )

  return (
    <div className="w-full mt-4" style={{ height: 'calc(100% - 22px - 1rem)' }}>
      <ResponsiveContainer width="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Area type="monotone" dataKey="hours" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
