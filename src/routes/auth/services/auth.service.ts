import {User, UserDoc} from "../../../schemas/user";
import {BadRequestError} from "../../../lib";
import {Password} from "../../../services/password";

async function signIn(email: string, password: string): Promise<UserDoc> {

    const existingUser = await User.findOne({email});

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);

    if (!passwordMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    return existingUser;
}

async function signUp(email: string, password: string): Promise<UserDoc> {

    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new BadRequestError('User already exists');
    }

    const user = User.build({email, password});
    await user.save();

    return user;
}

export {signUp, signIn};
