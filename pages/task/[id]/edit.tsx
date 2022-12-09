import axios from 'axios'
import Layout from 'components/Layout'
import TaskEditor from 'components/TaskEditor'

import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AxiosSingleResult, ID, TaskStructure } from 'types'

interface EditPageProps {
  id: ID
}

const TaskEdit: NextPage<EditPageProps> = ({ id }) => {
  const { data: session } = useSession()
  const [task, setTask] = useState<TaskStructure | undefined>(undefined)

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      try {
        const { data }: { data: AxiosSingleResult } = await axios.get(
          `http://localhost:3000/api/tasks/${id as string}`
        )

        const {
          data: { task }
        } = data

        setTask(task)
      } catch (err) {
        console.log(err)
      }
    }

    if (session !== null) {
      void fetchTasks()
    }
  }, [id, session])

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
