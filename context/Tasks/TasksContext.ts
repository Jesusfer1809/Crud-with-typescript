import { createContext } from 'react'
import { TasksContextInterface } from 'types'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const TasksContext = createContext<TasksContextInterface>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as TasksContextInterface
)

export default TasksContext
