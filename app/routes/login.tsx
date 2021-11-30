import * as React from 'react'
import type { MetaFunction } from 'remix'
import { FcGoogle } from 'react-icons/fc'
import jwtDecode from 'jwt-decode'

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
    description: 'Login page',
  }
}

export default function Login() {
  const [gsiScriptLoaded, setGsiScriptLoaded] = React.useState(false)

  const handleGoogleLogin = (response: any) => {
    const data = jwtDecode(response.credential)
    console.log({ credentials: data })
  }

  React.useEffect(() => {
    if (gsiScriptLoaded) return
    const initializeGsi = () => {
      if (!window.google || gsiScriptLoaded) return
      setGsiScriptLoaded(true)
      console.log('calling initialize')
      window.google.accounts.id.initialize({
        client_id: '392175623992-p4bhp6iu6n5tm53lmitcg3s6gmgpb953.apps.googleusercontent.com',
        callback: handleGoogleLogin,
      })
    }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.onload = initializeGsi
    script.async = true
    script.id = 'gsi-script'
    document.body.appendChild(script)

    return () => {
      window.google.accounts.id.cancel()
      document.getElementById('gsi-script')?.remove()
    }
  }, [gsiScriptLoaded, handleGoogleLogin])

  return (
    <div className="h-full w-full flex">
      <div className="h-screen w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Login to Sleep Tracker</h1>
          <div
            id="g_id_onload"
            data-client_id="392175623992-p4bhp6iu6n5tm53lmitcg3s6gmgpb953.apps.googleusercontent.com"
          >
            {/* <button className="g_id_signin bg-indigo-500 hover:bg-indigo-700 text-gray-500 font-semibold mt-12 py-2 px-4 rounded flex w-60 hover:bg-opacity-40 bg-opacity-40">
            <FcGoogle className="mr-4" />
            Login with Google
          </button> */}
            <div
              className="g_id_signin mt-12"
              data-type="standard"
              data-shape="rectangular"
              data-theme="filled_blue"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left"
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 h-screen w-1/2" />
    </div>
  )
}
