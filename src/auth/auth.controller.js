import { response, request } from 'express';
import bycrypt from 'bcryptjs';
import User from '../user/user.model.js';
import { generarJWT } from '../helpers/generate-JWT.js';

export const register = async (req = request, res = response) => {
    let { email, username, password } = req.body;
    email = email.toLowerCase();
    let salt = bycrypt.genSaltSync(10);
    password = bycrypt.hashSync(password, salt);
    const user = new User({
        email,
        username,
        password
    });
    await user.save();
    res.status(200).json({
        msg: "User created",
        userDetails: {
            email,
            username
        }
    });
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    let flag = false;
    let admin = false;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        flag = true;
    } else {
        if (bycrypt.compareSync(password, user.password)) {

            const token = await generarJWT(user.id, user.email);
            user.admin ? admin = true : admin = false;

            res.status(200).json({
                msg: "Login Ok!!!",
                userDetails: {
                    email: user.email,
                    username: user.username,
                    token: token,
                    admin: admin
                },
            });

        } else {
            flag = true;
        }
    }

    if (flag) {
        return res.status(400).json({
            msg:"Email or password are incorrect"
        });
    }
}