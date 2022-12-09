/* eslint-disable @typescript-eslint/space-before-function-paren */
import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import TasksState from '../context/Tasks/TasksState'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'

function MyApp({
  Component,
  pageProps
}: AppProps<{
  session: Session
}>): JSX.Element {
  const router = useRouter()
  return (
    <TasksState>
      <SessionProvider session={pageProps.session}>
        <Component key={router.asPath} {...pageProps} />
      </SessionProvider>
    </TasksState>
  )
}

export default MyApp
