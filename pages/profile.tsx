import React from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import { NextPage } from 'next'

import { useSession } from 'next-auth/react'
// import Image from 'next/image'

const ProfilePage: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div>
      {session !== null ? (
        <>
          {session?.user !== undefined && (
            <div className='bg-gray-800'>
              <Head>
                <title>Task Man || Profile</title>
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

                <div className='flex justify-between w-full mt-16 items-center'>
                  <span className='text-3xl font-medium'>
                    Profile: {session.user?.name}
                  </span>

                  <div className='relative h-40 w-40 overflow-hidden rounded-full border border-project_main'>
                    {/* <Image
                  ng-src={
                    session.user?.image || 'https://i.imgur.com/62MNvNU.png'
                  }
                  src={session.user?.image || 'https://i.imgur.com/62MNvNU.png'}
                  layout='fill'
                /> */}
                  </div>
                  {/* <Link href={`/task/${task?._id}/edit`}>
                <div className="px-4 flex items-center rounded-md bg-teal-500 font-medium cursor-pointer">
                  Edit
                </div>
              </Link> */}
                </div>

                <p className='block mt-10'>{session.user?.email}</p>

                {/* <div className="mt-20 text-sm">ID: {task?._id}</div>
            <div className="mt-4 text-sm">Created at: {task?.createdAt}</div> */}
              </Layout>
              <Toaster position='top-right' reverseOrder={false} />
            </div>
          )}
        </>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  )
}

export default ProfilePage
