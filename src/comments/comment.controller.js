import { response, request } from "express";
import Comment from "./comment.model.js";

export const createComment = async (req = request, res = response) => {
    const { postId, content } = req.body;
    const { userId } = req.params;
    const comment = new Comment({ postId, userId, content });
    await comment.save();
    res.status(201).json({
        msg: "Comment created"
    });
}

export const getCommentsForPost = async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ postId: postId });
    res.status(200).json({
        comments
    });
}