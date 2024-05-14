import { response, request } from "express";
import Comment from "./comment.model.js";
import User from "../user/user.model.js";

export const createComment = async (req = request, res = response) => {
    const { userId, postId, content, imagenData } = req.body;
    const { username } = await User.findById(userId);
    let name = username;
    const comment = new Comment({ postId, name, userId, content, imagenData });
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