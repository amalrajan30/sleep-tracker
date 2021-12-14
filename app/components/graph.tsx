import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

interface DailySleep {
  date: string
  hours: number
}

export default function Graph({ data }: { data: DailySleep[] }) {
  return (
    <div className="w-full mt-4" style={{ height: 'calc(100% - 22px - 1rem)' }}>
      <ResponsiveContainer width="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: -36, bottom: 0 }}>
          <Area type="monotone" dataKey="hours" stroke="#8884d8" fill="#8884d8" />
          <XAxis dataKey="date" fill="rgb(229 231 235)" />
          <YAxis />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
