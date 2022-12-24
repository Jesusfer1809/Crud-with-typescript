import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from 'utils/mongodb'
import { dbConnect } from 'utils/mongoose'
import User from 'models/UserModel'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/signIn'
  },
  events: {
    async createUser(message) {
      await dbConnect()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const newUser = await User.findOne({ email: message.user.email })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      await newUser.save()
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  adapter: MongoDBAdapter(clientPromise)
}
export default NextAuth(authOptions)
