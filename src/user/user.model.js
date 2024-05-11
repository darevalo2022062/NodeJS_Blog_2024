import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    admin: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("User", UserSchema);