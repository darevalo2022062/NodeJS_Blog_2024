import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: null
    },
    postId: {
        type: String,
        default: null
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Comment", CommentSchema);