import Head from 'next/head'

import React, { useContext, useEffect, useState } from 'react'

import { Toaster } from 'react-hot-toast'

import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/Layout'
import TasksContext from 'context/Tasks/TasksContext'
import { ID, TaskStructure } from 'types'

interface TaskPageProps {
  id: ID
}

const TaskShowcase: NextPage<TaskPageProps> = ({ id }) => {
  const { getTask, tasks } = useContext(TasksContext)

  const [task, setTask] = useState<TaskStructure | undefined>(undefined)

  useEffect(() => {
    const requiredTask = getTask(id)
    if (requiredTask !== undefined) {
      setTask(requiredTask)
    }
  }, [tasks, getTask, id])

  return (
    <div className='bg-gray-800'>
      <Head>
        <title>Task Man || {task?.id}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout isInIndex={true}>
        <div className=''>
          <Link href='/' className='block'>
            <span className=' inline-block  text-blue-300 border-b border-b-blue-300 cursor-pointer'>
              &larr; Back
            </span>
          </Link>
        </div>

        <div className='flex justify-between w-full mt-16'>
          <span className='text-3xl font-medium'>{task?.title}</span>
          <Link href={`/task/${task?.id !== undefined ? task.id : ''}/edit`}>
            <div className='px-4 flex items-center rounded-md bg-teal-500 font-medium cursor-pointer'>
              Edit
            </div>
          </Link>
        </div>

        <p className='block mt-10'>{task?.description}</p>

        <div className='mt-20 text-sm'>ID: {task?.id}</div>
        <div className='mt-4 text-sm'>Created at: {Date.now()}</div>
      </Layout>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  )
}

export default TaskShowcase

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as ID

  return {
    props: {
      id
    }
  }
}
