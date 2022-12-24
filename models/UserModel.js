import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    image: {
      type: String,
      default: 'https://i.imgur.com/62MNvNU.png'
    },
    emailVerified: {
      type: Date
    },
    mood: {
      type: String,
      default: 'uwu'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default models.User || model('User', userSchema)
