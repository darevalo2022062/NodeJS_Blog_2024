import { response, request } from "express";
import Post from "./post.model.js";
import { ContextBuilder } from "express-validator/src/context-builder.js";

export const createPost = async (req = request, res = response) => {
    const { title, content, imageData } = req.body;
    const post = new Post({ title, content, imageData });
    await post.save();
    res.status(201).json({
        msg: "Post created"
    });
}

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json({
        posts
    });
}

export const getPostById = async (req, res) => {
    const { idPost } = req.params;
    const post = await Post.findById(idPost);
    res.status(200).json({
        post
    });
}

export const serchNamePost = async (req, res) => {
    const { title } = req.body;
    let titles = [];
    titles = getPosts();

    const matchingPosts = titles.filter(post => {
        const postTitle = post.title.toLowerCase();
        const searchTermLower = title.toLowerCase();

        const escapedSearchTerm = searchTermLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const regex = new RegExp(escapedSearchTerm, 'i');

        return regex.test(postTitle);
    });

    let coincidence = matchingPosts;

    if (coincidence.length === 0) {
        return res.status(404).json({
            msg: "No post found"
        });
    } else {
        return res.status(200).json({
            userDetails: {
                coincidence
            }
        });
    }

}

