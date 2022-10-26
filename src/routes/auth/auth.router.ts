import {currentUser, validateRequest} from "../../lib";
import {Request, Response} from "express";
import {signupValidator} from "./validators/signup.validator";
import {signinValidator} from "./validators/signin.validator";
import * as AuthService from "./services/auth.service";
import jwt from "jsonwebtoken";
import {UserDoc} from "../../schemas/user";

const authRouter = require('express').Router();

authRouter.get('/currentuser', currentUser, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null});
});

authRouter.post('/signup', signupValidator, validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await AuthService.signUp(email, password);

    res.setHeader("Authorization", `Bearer ${signJwt(user)}`);

    res.status(201).send(user);
});


authRouter.post('/signin', signinValidator, validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await AuthService.signIn(email, password);

    res.setHeader("Authorization", `Bearer ${signJwt(user)}`);

    res.status(200).send(user);
});

function signJwt(user: UserDoc): string {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, global.appConfig.jwtSecret);
}

export {authRouter};
