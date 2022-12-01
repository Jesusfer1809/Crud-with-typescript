import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface NavbarProps {
  isInIndex: boolean
}

function Navbar({ isInIndex }: NavbarProps): JSX.Element {
  const router = useRouter()

  const pushToNewTaskPage = async (): Promise<void> => {
    await router.push('/newTask')
  }

  return (
    <div className='w-full px-4 py-6 bg-gray-900 text-white flex justify-between items-center border-b border-b-white'>
      <div>
        <Link href='/'>
          <a>
            <h1 className='font-medium py-2 md:text-lg'>Task Manager ⏲</h1>
          </a>
        </Link>
      </div>

      {isInIndex && (
        <div>
          <button
            onClick={pushToNewTaskPage}
            className='flex items-center space-x-2 bg-teal-500 px-2 py-2 rounded-md font-medium'
          >
            <AiOutlinePlus />
            <span>New Task</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
