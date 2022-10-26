import {authRouter} from "./auth/auth.router";

const apiRouter = require('express').Router();

apiRouter.use('/auth', authRouter);

export {apiRouter};
