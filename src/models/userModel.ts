// src/models/userModel.ts
import mongoose, { Document, Model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDoc>(
  {
    username: { type: String, required: [true, "Please provide a username"], unique: true },
    email: { type: String, required: [true, "Please provide a email"], unique: true },
    password: { type: String, required: [true, "Please provide a password"] },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// Use a stable model name (Mongoose reuses models across hot reloads)
const User: Model<IUserDoc> =
  (mongoose.models.users as Model<IUserDoc>) || mongoose.model<IUserDoc>("users", userSchema);

export default User;
