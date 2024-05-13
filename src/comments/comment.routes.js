import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createComment, getCommentsForPost } from "./comment.controller.js";

const router = Router();

router.post(
    '/createComment/:userId',
    [
        validarJWT,
        check('content', 'Comment is required').not().isEmpty(),
        validarCampos
    ], createComment)

router.get(
    '/getCommentsForPost/:postId',
    [
        check('postId', 'Id is required').not().isEmpty(),
        validarCampos
    ],
    getCommentsForPost
)

export default router;