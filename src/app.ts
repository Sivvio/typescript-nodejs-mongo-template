import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import {errorHandler, NotFoundError} from "./lib";
import {apiRouter} from "./routes/apiRouter";

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use('/api', apiRouter);

app.all('*', (req, res, next) => {
    throw new NotFoundError('Not found');
});

app.use(errorHandler);

export {app};
