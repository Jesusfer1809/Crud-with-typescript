import React, { useEffect, useReducer } from 'react'
import TasksReducer from './TasksReducer'
import TasksContext from './TasksContext'

// import { trimDate } from '../../utils/functions'
// import axios from 'axios'

import { TaskStructure, ID, TasksState } from 'types'

interface TasksStateProps {
  children: React.ReactNode
}
const initialState: TasksState = {
  tasks: []
}

const TaksState = (props: TasksStateProps): JSX.Element => {
  const [state, dispatch] = useReducer(TasksReducer, initialState)

  useEffect(() => {
    let tasksLC
    const stringLC = localStorage.getItem('tasks')

    if (stringLC !== null) {
      tasksLC = JSON.parse(stringLC) as TaskStructure[]
      dispatch({ type: 'ADD_TASK', payload: tasksLC })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  const createTask = (task: TaskStructure): void => {
    dispatch({
      type: 'ADD_TASK',
      payload: [task]
    })
  }

  const getTask = (id: ID): TaskStructure | undefined => {
    const task = state.tasks.find((task: TaskStructure) => {
      return task.id === id
    })
    if (task !== undefined) {
      return task
    } else {
      return undefined
    }
  }

  const updateTask = (newTask: TaskStructure): void => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: newTask
    })
  }

  const deleteTask = (id: ID): void => {
    dispatch({
      type: 'DELETE_TASK',
      payload: id
    })
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,

        createTask,
        getTask,
        updateTask,
        deleteTask
      }}
    >
      {props.children}
    </TasksContext.Provider>
  )
}

export default TaksState
