/* eslint-disable @typescript-eslint/space-before-function-paren */
import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TasksState from '../context/Tasks/TasksState'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <TasksState>
      <Component {...pageProps} />
    </TasksState>
  )
}

export default MyApp
