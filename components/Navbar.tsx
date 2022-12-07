import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useSession, signIn } from 'next-auth/react'

import { HiOutlineUserCircle } from 'react-icons/hi'
import UserDropdownMenu from './UserDropdownMenu'

interface NavbarProps {
  isInIndex: boolean
}

function Navbar({ isInIndex }: NavbarProps): JSX.Element {
  const router = useRouter()

  const pushToNewTaskPage = async (): Promise<void> => {
    await router.push('/newTask')
  }

  const { data: session } = useSession()

  const [userOpen, setUserOpen] = useState(false)

  const toggleUser = (): void => {
    setUserOpen(!userOpen)
  }

  return (
    <div className='w-full px-4 py-6 bg-gray-900 text-white flex justify-between items-center border-b border-b-white relative'>
      <div>
        <Link href='/'>
          <a>
            <h1 className='font-medium py-2 md:text-lg'>Task Manager ⏲</h1>
          </a>
        </Link>
      </div>
      <div className='flex space-x-4 xs:space-x-8 items-center sm:space-x-10'>
        {session != null ? (
          <div className='flex items-center'>
            <HiOutlineUserCircle
              onClick={toggleUser}
              className='w-8 h-8 cursor-pointer'
            />
          </div>
        ) : (
          <div className='flex space-x-4 items-center'>
            Not signed in <br />
            <button
              className='px-4 py-2 bg-teal-500 rounded-md'
              onClick={async () => await signIn()}
            >
              Sign in
            </button>
          </div>
        )}

        {isInIndex && (
          <div>
            <button
              onClick={pushToNewTaskPage}
              disabled={session === null}
              className='flex items-center space-x-2 bg-teal-500 px-2 py-2 rounded-md font-medium'
            >
              <AiOutlinePlus />
              <span>New Task</span>
            </button>
          </div>
        )}
      </div>

      <UserDropdownMenu userOpen={userOpen} />
    </div>
  )
}

export default Navbar
