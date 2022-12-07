import { dbConnect } from 'utils/mongoose'
import Task from 'models/TaskModel'
import { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { TaskStructure } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await dbConnect()
  const session = await unstable_getServerSession(req, res, authOptions)
  console.log(session)
  const id = req.query.id

  try {
    switch (req.method) {
      case 'GET':
        if (session !== null) {
          const task: TaskStructure | undefined | null = await Task.findById(id)
          if (task === undefined && task === null) {
            return res
              .status(404)
              .json({ message: 'Task not found with that ID!' })
          }
          return res.status(200).json({
            status: 'success',
            data: {
              task
            }
          })
        } else {
          return res.status(403).json({
            status: 'fail',
            message: 'You are not logged in'
          })
        }

      case 'PATCH': {
        const updatedTask: TaskStructure | null = await Task.findByIdAndUpdate(
          id,
          req.body as TaskStructure,
          {
            new: true,
            runValidators: true
          }
        )

        if (updatedTask === null) {
          return res
            .status(404)
            .json({ message: 'Task not found with that ID!' })
        }

        return res.status(200).json({
          status: 'success',
          data: {
            task: updatedTask
          }
        })
      }

      case 'DELETE': {
        const deleteTask: TaskStructure | null = await Task.findByIdAndDelete(
          id
        )
        if (deleteTask === null) {
          return res
            .status(404)
            .json({ message: 'Task not found with that ID!' })
        }
        return res.status(204).json({
          status: 'success',
          data: null
        })
      }

      default:
        return res.status(400).json({
          message: 'This method is not supported yet'
        })
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}
