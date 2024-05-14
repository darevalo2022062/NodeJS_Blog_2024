import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageData: {
        data: Buffer,
        contentType: String
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Post", PostSchema);