import User from '../user/user.model.js';

export const emailExists = async (email = '') => {
    const existence = await User.findOne({ email:email});
    if (existence) {
        throw new Error(`The email ${email} is already registered`);
    }
}

export const usernameExists = async (username = '') => {
    const existence = await User.findOne({username:username});
    if (existence) {
        throw new Error(`The username ${username} is already registered`);
    }
}
