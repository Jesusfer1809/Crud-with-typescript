import React, { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import Hello from 'components/Hello'

import { ModalState, TaskStructure } from 'types'

// import CharInfo from 'components/CharInfo'
import Layout from 'components/Layout'

import { Toaster } from 'react-hot-toast'
import DeleteModal from 'components/DeleteModal'
import TaskShowcase from 'components/TaskShowcase'

const Home: NextPage = () => {
  const [modal, setModal] = useState<ModalState>({
    id: undefined,
    isOpened: false
  })

  const [deleted, setDeleted] = useState(0)

  const reRender = (): void => {
    setDeleted((d) => d + 1)
  }

  const openModal = (task: TaskStructure): void => {
    setModal({
      id: task._id,
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
    <div className='bg-gray-800 font-roboto'>
      <Head>
        <title>Task Man</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout isInIndex={true}>
        <div className='flex flex-col space-y-8'>
          <TaskShowcase key={deleted} openModal={openModal} />
        </div>
      </Layout>
      <Toaster position='top-right' reverseOrder={false} />
      <DeleteModal
        modalState={modal}
        closeModal={closeModal}
        reRender={reRender}
      />
    </div>
  )
}

export default Home
