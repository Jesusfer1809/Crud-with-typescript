import { dbConnect } from 'utils/mongoose'
import Task from 'models/TaskModel'
import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { TaskStructure } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await unstable_getServerSession(req, res, authOptions)

  await dbConnect()

  try {
    switch (req.method) {
      case 'GET': {
        if (session !== null) {
          const tasks: TaskStructure[] = await Task.find({
            creator: session.user?.email
          })

          return res.status(200).json({
            status: 'success',
            data: {
              tasks
            }
          })
        } else {
          return res.status(200).json({
            status: 'success',
            data: {
              tasks: []
            }
          })
        }
      }

      case 'POST': {
        if (session !== null) {
          const newTask = (await Task.create({
            ...req.body,
            creator: session.user?.email
          })) as TaskStructure

          return res.status(200).json({
            status: 'success',
            data: {
              task: newTask
            }
          })
        } else {
          return res.status(403).json({
            status: 'fail',
            message: 'You are not logged in'
          })
        }
      }

      default:
        return res.status(400).json({ msg: 'this method is not suported' })
    }
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}
