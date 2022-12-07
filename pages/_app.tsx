/* eslint-disable @typescript-eslint/space-before-function-paren */
import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import TasksState from '../context/Tasks/TasksState'
import { SessionProvider } from 'next-auth/react'

function MyApp({
  Component,
  pageProps
}: AppProps<{
  session: Session
}>): JSX.Element {
  return (
    <TasksState>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </TasksState>
  )
}

export default MyApp
