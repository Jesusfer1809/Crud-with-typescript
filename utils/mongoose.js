import { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}

export async function dbConnect() {
  if (conn.isConnected) {
    console.log('db already connected')
    return
  }

  const db = await connect(process.env.MONGODB_URL)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  conn.isConnected = db.connections[0].readyState
}

connection.on('connected', () => {
  console.log('Mongodb is connected')
})

connection.on('error', (err) => {
  console.log(err)
})
