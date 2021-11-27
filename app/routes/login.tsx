import type { MetaFunction } from 'remix'
import { FcGoogle } from 'react-icons/fc'

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
    description: 'Login page',
  }
}

export default function Login() {
  return (
    <div className="h-full w-full flex">
      <div className="h-screen w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Login to Sleep Tracker</h1>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-gray-500 font-semibold mt-12 py-2 px-4 rounded flex w-60 hover:bg-opacity-40 bg-opacity-40">
            <FcGoogle className="mr-4" />
            Login with Google
          </button>
        </div>
      </div>
      <div className="bg-gray-100 h-screen w-1/2" />
    </div>
  )
}
