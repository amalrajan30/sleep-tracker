import * as React from 'react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
  useLoaderData,
} from 'remix'
import type { LinksFunction, LoaderFunction } from 'remix'
import styles from './styles/app.css'
import { Sidebar } from './components/sidebar'
import { getUserSession } from './utils/session.server'

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
  if (request.url.endsWith('/dashboard')) {
    const session = await getUserSession(request)
    if (session.has('name')) {
      return { name: session.get('name'), avatar: session.get('avatar') }
    }
    return { name: 'Guest' }
  }
  return null
}

export default function App() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <Document>
      {location.pathname === '/login' ? (
        <Outlet />
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </Document>
  )
}

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

const useSystemPreference = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  if (typeof window !== 'undefined') {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
    React.useEffect(() => {
      setIsDarkMode(prefersDarkMode.matches)
      const handler = (e: MediaQueryListEvent) => {
        e.matches ? setIsDarkMode(true) : setIsDarkMode(false)
      }
      prefersDarkMode.addListener(handler)
      return () => prefersDarkMode.removeListener(handler)
    }, [])
  }
  return isDarkMode
}

const useDarkMode = () => {
  if (typeof window === 'undefined') {
    return { theme: 'system', changeTheme: () => {} }
  }
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'system')

  const preferDarkMode = useSystemPreference()

  const enabled = theme === 'dark' || (theme === 'system' && preferDarkMode)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (enabled) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [enabled])

  React.useEffect(() => {
    if (theme === 'system') {
      localStorage.removeItem('theme')
    } else if (theme === 'dark') {
      localStorage.theme = 'dark'
    } else {
      localStorage.theme = 'light'
    }
  }, [theme])

  return { theme, changeTheme: setTheme }
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  const [mounted, setMounted] = React.useState(false)
  const data = useLoaderData()
  const { theme, changeTheme } = useDarkMode()

  React.useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div
      style={{ visibility: mounted ? 'visible' : 'hidden' }}
      className="flex overflow-hidden h-screen"
    >
      <Sidebar />
      <div className="overflow-hidden h-full w-full">
        <header className="flex justify-end items-center sticky w-full h-12 pr-6 shadow bg-white dark:bg-gray-800">
          <span className="mr-4 flex items-baseline">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mr-2">
              Theme:
            </label>
            <select
              defaultValue={theme}
              className="dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-400"
              onChange={(e) => changeTheme(e.target.value as 'system' | 'dark' | 'light')}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </span>
          <span className="w-7 overflow-hidden h-7 rounded-full mr-2">
            <img
              src={
                data && data.avatar
                  ? data.avatar
                  : 'https://avatars.dicebear.com/api/adventurer/test.svg'
              }
              alt="avatar"
            />
          </span>
          <span className="text-gray-900 dark:text-white">
            <p className="font-semibold">Guest</p>
          </span>
        </header>
        <div
          className="bg-gray-200 dark:bg-gray-900 p-6 overflow-y-scroll"
          style={{ height: 'calc(100% - 3rem)' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
      break
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </Layout>
    </Document>
  )
}
