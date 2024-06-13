import mongoose, { Schema, Document, BooleanExpression } from "mongoose";
import { Monofett } from "next/font/google";
import { useReducer } from "react";
export interface Message extends Document {
  content: string;
  createdAt: Date
}
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date
  }
})

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verfyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: Boolean;
  messages: Message[]
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/.+\@.+\..+/, 'please use valide email address'],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "verify code is required"],
  },
  verfyCodeExpiry: {
    type: Date,
    required: [true, "verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true
  },
  messages: [MessageSchema]
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);
export default userModel