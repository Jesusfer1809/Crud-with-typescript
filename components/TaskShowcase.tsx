import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AxiosResult, TaskStructure } from 'types'
import TaskComponent from './TaskComponent'

interface TaskShowcaseProps {
  openModal: (task: TaskStructure) => void
}

function TaskShowcase({ openModal }: TaskShowcaseProps): JSX.Element {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<TaskStructure[]>([])

  const fetchTasks = async (): Promise<void> => {
    try {
      const { data }: { data: AxiosResult } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/tasks`
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

  if (session === null) {
    return <h2 className='text-2xl'>Please login to start creating tasks!</h2>
  }

  if (tasks.length === 0) {
    return <h2 className='text-2xl'>You don&apos;t have any tasks!!</h2>
  }

  return (
    <div className='flex flex-col space-y-8'>
      {tasks.map((task, index) => (
        <TaskComponent
          key={index}
          task={task}
          index={index + 1}
          openModal={openModal}
        />
      ))}
    </div>
  )
}

export default TaskShowcase
