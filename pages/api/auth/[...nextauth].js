import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from 'utils/mongodb'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
    // ...add more providers here
  ],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  adapter: MongoDBAdapter(clientPromise)
}
export default NextAuth(authOptions)
