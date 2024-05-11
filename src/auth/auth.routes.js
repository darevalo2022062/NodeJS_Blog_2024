import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExists, usernameExists } from "../helpers/db-validators.js";

const router = Router();

router.post(
    '/register',
    [
        check('email', 'You must enter a valid email').isEmail(),
        check('email').custom(emailExists),
        check('username', 'Username is required').not().isEmpty(),
        check('username').custom(usernameExists),
        check('password', 'The password must contain a minimum of 6 digits').isLength({ min: 6 }),
        validarCampos
    ], register)

router.post(
    '/login',
    [
        check('email', 'You must enter a valid email').isEmail(),
        check('password', 'The password must contain a minimum of 6 digits').isLength({ min: 6 }),
        validarCampos
    ], login)

export default router;