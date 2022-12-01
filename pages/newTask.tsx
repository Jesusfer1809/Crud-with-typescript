import TaskEditor from 'components/TaskEditor'
import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import { Toaster } from 'react-hot-toast'

const newTask: NextPage = () => {
  return (
    <div className='bg-gray-800'>
      <Head>
        <title>Task Man || New Task</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout isInIndex={false}>
        <TaskEditor />
      </Layout>

      <Toaster position='top-right' reverseOrder={false} />
    </div>
  )
}

export default newTask
