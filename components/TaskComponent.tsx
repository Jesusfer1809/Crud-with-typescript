import Link from 'next/link'
import React, { ReactElement } from 'react'

import { BsTrash } from 'react-icons/bs'
import { TaskStructure } from 'types'

interface TaskComponentProps {
  task: TaskStructure
  index: number
  openModal: (task: TaskStructure) => void
}

function TaskComponent({
  task,
  index,
  openModal
}: TaskComponentProps): ReactElement {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation()
    openModal(task)
  }

  return (
    <Link href={`/task/${task._id !== undefined ? task._id : ''}`} passHref>
      <div className='bg-gray-900 bg-opacity-50 px-4 py-4 flex justify-between space-x-8 rounded-md cursor-pointer'>
        <div className='flex items-center text-2xl 2xl:text-3xl'>{index}</div>
        <div className='flex-grow flex flex-col space-y-5'>
          <div className='flex justify-between items-center flex-wrap'>
            <span className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-medium mr-4 mb-3'>
              {task.title}
            </span>
            <button
              onClick={handleDelete}
              className='bg-red-600 px-4 py-1 2xl:py-2 flex items-center gap-x-1 rounded-sm 2xl:rounded-md 2xl:text-xl'
            >
              <BsTrash />
              <span>Delete</span>
            </button>
          </div>
          <div>
            <p className='block mb-2 2xl:text-lg'>{task.description}</p>
            <p className='text-xs text-gray-400 block mt-6 2xl:text-base'>
              ID: {task._id}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TaskComponent
