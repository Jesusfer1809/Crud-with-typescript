import Layout from 'components/Layout'
import TaskEditor from 'components/TaskEditor'
import TasksContext from 'context/Tasks/TasksContext'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { ID, TaskStructure } from 'types'

interface EditPageProps {
  id: ID
}

const TaskEdit: NextPage<EditPageProps> = ({ id }) => {
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
        <title>Task Man || Edit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout isInIndex={false}>
        <TaskEditor isEditing prevTask={task} />
      </Layout>

      <Toaster position='top-right' reverseOrder={false} />
    </div>
  )
}

export default TaskEdit

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx?.params?.id as ID

  return {
    props: {
      id
    }
  }
}
