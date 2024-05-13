import { Router } from "express";
import { check } from "express-validator";
import { createPost, getPosts, serchNamePost, getPostById } from "./post.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    '/createPost',
    [
        validarJWT,
        check('title', 'Title is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty(),
        validarCampos
    ], createPost)

router.get(
    '/getPosts',
    getPosts)

router.get(
    '/getPostById/:idPost',
    [
        check('idPost', 'Id is required').not().isEmpty(),
        validarCampos
    ],
    getPostById)

router.post(
    '/serchNamePost',
    [
        check('title', 'Title is required').not().isEmpty(),
        validarCampos
    ], serchNamePost)

export default router;