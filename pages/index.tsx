import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import Hello from 'components/Hello'

import { ModalState, TaskStructure } from 'types'

// import CharInfo from 'components/CharInfo'
import Layout from 'components/Layout'
import TaskComponent from 'components/TaskComponent'
import { Toaster } from 'react-hot-toast'
import DeleteModal from 'components/DeleteModal'

// interface Props {
//   characters: Character[]
// }

const Home: NextPage = () => {
  const tasks: TaskStructure[] = [
    {
      id: 1,
      title: 'Clean the house',
      description: 'You have to do the housework',
      creator: 'Jesus'
    }
  ]

  const [modal, setModal] = useState<ModalState>({
    id: undefined,
    isOpened: false
  })

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

  return (
    <div className='bg-gray-800'>
      <Head>
        <title>Task Man</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout isInIndex={true}>
        <div className='flex flex-col space-y-8'>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskComponent
                key={index}
                task={task}
                index={index + 1}
                openModal={openModal}
              />
            ))
          ) : (
            <h2 className='text-2xl'>You don&apos;t have any tasks!!</h2>
          )}
        </div>
      </Layout>
      <Toaster position='top-right' reverseOrder={false} />
      <DeleteModal modalState={modal} closeModal={closeModal} />
    </div>
  )
}

export default Home
