// import { v4 as uuidv4 } from 'uuid'
// import { trimDate } from '../../utils/functions'

import { TaskStructure, TasksState } from 'types'

type TodoAction =
  | {
      type: 'ADD_TASK'
      payload: TaskStructure[]
    }
  | {
      type: 'UPDATE_TASK'
      payload: TaskStructure
    }
  | {
      type: 'DELETE_TASK'
      payload: TaskStructure['id']
    }

const TasksReducer = (state: TasksState, action: TodoAction): TasksState => {
  const { payload, type } = action

  switch (type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, ...payload]
      }

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? payload : task
        )
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload)
      }

    default:
      return state
  }
}

export default TasksReducer
