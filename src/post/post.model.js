import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    idUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    image: {
        data: Buffer,
        contentType: String
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Post", PostSchema);