interface Summary {
  avgSleepTime: string
  avgWakeTime: string
  avgSleepDuration: number | string
  daysLessThan6Hours: number
  daysMoreThan8Hours: number
}

export default function Summary({ data }: { data: Summary }) {
  return (
    <div className="grid gap-2 mt-4 text-gray-500" style={{ gridTemplateColumns: '1fr 4rem' }}>
      <p className="font-semibold inline-block">Avg sleep time</p>
      <p className="font-bold">{data.avgSleepTime}</p>
      <p className="font-semibold inline-block">Avg wake up time</p>
      <p className="font-bold">{data.avgWakeTime}</p>
      <p className="font-semibold inline-block">Avg sleep duration</p>
      <p className="font-bold">{data.avgSleepDuration ? `${data.avgSleepDuration} hrs` : 0}</p>
      <p className="font-semibold inline-block">No of days slept less than 6hrs </p>
      <p className="font-bold">{data.daysLessThan6Hours}</p>
      <p className="font-semibold inline-block">No of days slept more than 8hrs </p>
      <p className="font-bold">{data.daysMoreThan8Hours}</p>
    </div>
  )
}
