import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

interface DailySleep {
  date: string
  hours: number
}

export default function Graph({ data }: { data: DailySleep[] }) {

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
