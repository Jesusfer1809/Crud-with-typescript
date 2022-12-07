import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import Hello from 'components/Hello'

import { AxiosResult, ModalState, TaskStructure } from 'types'
import { useSession } from 'next-auth/react'

// import CharInfo from 'components/CharInfo'
import Layout from 'components/Layout'
import TaskComponent from 'components/TaskComponent'
import { Toaster } from 'react-hot-toast'
import DeleteModal from 'components/DeleteModal'
// import TasksContext from 'context/Tasks/TasksContext'
import axios from 'axios'

// interface Props {
//   characters: Character[]
// }

const Home: NextPage = () => {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<TaskStructure[]>([])

  const [modal, setModal] = useState<ModalState>({
    id: undefined,
    isOpened: false
  })

  const fetchTasks = async (): Promise<void> => {
    try {
      const { data }: { data: AxiosResult } = await axios.get(
        'http://localhost:3000/api/tasks'
      )

      const {
        data: { tasks }
      } = data

      setTasks(tasks)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (session !== null) {
      void fetchTasks()
    }
  }, [session])

  const openModal = (task: TaskStructure): void => {
    setModal({
      id: task.id,
      isOpened: true
    })
  }

  const closeModal = (): void => {
    setModal({
      id: undefined,
      isOpened: false
    })
  }

  const renderTasks = (): JSX.Element | JSX.Element[] => {
    if (session == null) {
      return <h2 className='text-2xl'>Please login to start creating tasks!</h2>
    }

    if (tasks.length === 0) {
      return <h2 className='text-2xl'>You don&apos;t have any tasks!!</h2>
    }

    return tasks.map((task, index) => (
      <TaskComponent
        key={index}
        task={task}
        index={index + 1}
        openModal={openModal}
      />
    ))
  }

  return (
    <div className='bg-gray-800'>
      <Head>
        <title>Task Man</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout isInIndex={true}>
        <div className='flex flex-col space-y-8'>{renderTasks()}</div>
      </Layout>
      <Toaster position='top-right' reverseOrder={false} />
      <DeleteModal modalState={modal} closeModal={closeModal} />
    </div>
  )
}

export default Home
