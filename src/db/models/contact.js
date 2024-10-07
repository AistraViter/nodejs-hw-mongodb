import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // ObjectId для зв'язування з користувачами
      ref: 'users', // Додаємо референс до колекції користувачів
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
