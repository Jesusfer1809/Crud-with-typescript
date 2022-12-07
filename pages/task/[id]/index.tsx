import Head from 'next/head'

import React, { useEffect, useState } from 'react'

import { Toaster } from 'react-hot-toast'

import Link from 'next/link'
import { NextPage } from 'next'
import Layout from 'components/Layout'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { AxiosSingleResult, TaskStructure } from 'types'
import { useRouter } from 'next/router'

// interface TaskPageProps {
//   task: TaskStructure
// }

const TaskShowcase: NextPage = (): JSX.Element => {
  const { data: session } = useSession()

  const [task, setTask] = useState<TaskStructure>()
  const router = useRouter()
  const id = router.query.id

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
  }, [session, id])
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

        <div className='mt-20 text-sm'>ID: {task?._id}</div>
        <div className='mt-4 text-sm'>
          Created at: {String(task?.createdAt)}
        </div>
      </Layout>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  )
}

export default TaskShowcase

// eslint-disable-next-line @typescript-eslint/require-await
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const baseURL = process.env.BASE_URL
//   const id = ctx.params?.id as ID

//   const { data }: { data: AxiosSingleResult } = await axios.get(
//     `${baseURL !== undefined ? baseURL : ''}/api/tasks/${
//       id !== undefined ? id : ''
//     }`
//   )

//   const {
//     data: { task }
//   } = data

//   return {
//     props: {
//       task
//     }
//   }
// }
