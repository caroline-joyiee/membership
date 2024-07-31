import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({


  email: { type: String },
  userName: { type: String, lowercase: true },
  password: { type: String },
  confirmPassword: { type: String },
  member: { type: Types.ObjectId, ref: 'Member' },


}, {
  timestamps: true
})

userSchema.plugin(toJSON)
export const user_Model = model('User', userSchema)

