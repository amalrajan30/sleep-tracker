type Props = {
  title: string
  value: string
}

export default function InfoCard({ title, value }: Props) {
  return (
    <div>
      <h4 className="text-gray-400 text-sm font-semibold">{title}</h4>
      <p className="mt-2 font-bold text-3xl text-black">{value}</p>
    </div>
  )
}
