import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import Link from 'next/link'

import {
  // trimDate,
  defaultToastStyle,
  getErrorMessage
} from '../utils/functions'
import { TaskStructure } from 'types'
import axios from 'axios'

interface TaskEditorProps {
  isEditing?: boolean
  prevTask?: TaskStructure
}

function TaskEditor({ isEditing, prevTask }: TaskEditorProps): JSX.Element {
  const router = useRouter()

  const [task, setTask] = useState<TaskStructure>({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (prevTask !== undefined) setTask(prevTask)
  }, [prevTask])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    try {
      if (task.title.trim() === '') {
        throw new Error('Task must have a title.')
      }

      if (isEditing !== true) {
        // If it is not editing, then it is creating a task
        // , createdAt: trimDate(Date.now())
        await axios.post('http://localhost:3000/api/tasks', task)
        toast.success('New task created!!', {
          style: defaultToastStyle
        })
      } else {
        console.log('updating')
        await axios.patch(
          `http://localhost:3000/api/tasks/${
            task._id !== undefined ? task._id : ''
          }`,
          task
        )
        toast.success('Task updated!!', {
          style: defaultToastStyle
        })
      }

      await router.push('/')
    } catch (err) {
      const message = getErrorMessage(err)
      toast.error(message, {
        style: defaultToastStyle
      })
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-xl font-medium block'>
          {isEditing === true ? 'Edit Task' : 'New Task'}
        </h2>

        <Link href='/' className='block'>
          <span className=' inline-block  text-blue-300 border-b border-b-blue-300 cursor-pointer'>
            &larr; Back
          </span>
        </Link>
      </div>
      <form
        action='#'
        onSubmit={handleSubmit}
        className=' mt-12 flex flex-col space-y-6'
      >
        <fieldset>
          <label htmlFor='title' className='block mb-1 text-lg'>
            Title:
          </label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Task title...'
            onChange={handleChange}
            value={task?.title}
            className='w-full px-4 py-2 rounded-sm text-gray-900 border-2 border-transparent  focus:outline-teal-500 focus:border-2 focus:border-teal-500'
          />
        </fieldset>

        <fieldset>
          <label htmlFor='description' className='block mb-1 text-lg'>
            Description:
          </label>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={3}
            onChange={handleChange}
            value={task?.description}
            placeholder='Task description...'
            className='w-full px-4 py-2 rounded-sm text-gray-900 border-2 border-transparent  focus:outline-teal-500 focus:border-2 focus:border-teal-500'
          ></textarea>
        </fieldset>

        <button className='w-full py-2 bg-teal-500 block rounded-sm'>
          Save
        </button>
      </form>
    </>
  )
}

export default TaskEditor
