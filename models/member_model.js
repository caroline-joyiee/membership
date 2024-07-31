import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { userSchema } from "../schema/user_schema.js";

const memberSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    dateOfBirth: { type: String },
    sex: { type: String, enum: ['Male', 'Female'] },
    contactInfo: { type: String },
    startDate: { type: Date },
    emergencyName: { type: String },
    emergencyContact: { type: String },
    image: { type: String },
    user: { type: Types.ObjectId, ref: "User", select: false }

}, {
    timestamps: true,
});

userSchema.plugin(toJSON);
export const member_Model = model('Member', memberSchema);
