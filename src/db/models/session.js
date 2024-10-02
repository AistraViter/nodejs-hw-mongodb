import { model, Schema } from 'mongoose';

const sessionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // ObjectId для зв'язування з користувачами
      ref: 'users', // Додаємо референс до колекції користувачів
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionsCollection = model('sessions', sessionsSchema);
