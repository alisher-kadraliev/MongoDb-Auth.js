import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    image: { type: String },
    authProviderId: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
},
    {
        timestamps: true,
    }
)

export const User = mongoose.models?.User || mongoose.model("User", userSchema)