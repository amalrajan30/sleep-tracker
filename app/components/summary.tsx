export default function Summary() {
  return (
    <div className="grid gap-2 mt-4 text-gray-500" style={{ gridTemplateColumns: '80% auto' }}>
      <p className="font-semibold inline-block">Avg sleep duration</p>{' '}
      <p className="font-bold">6hrs</p>
      <p className="font-semibold inline-block">No of days slept less than 6hrs </p>{' '}
      <p className="font-bold">6 Days</p>
      <p className="font-semibold inline-block">No of days slept more than 8hrs </p>{' '}
      <p className="font-bold">6 Days</p>
    </div>
  )
}
