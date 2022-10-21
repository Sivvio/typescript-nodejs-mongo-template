import * as dotenv from 'dotenv'
import {app} from "./app";
import {initConfig} from "../config/config";
import mongoose from "mongoose";

dotenv.config();

initConfig();

const start = async () => {
    try {
        await mongoose.connect(global.appConfig.mongoUri);
        console.log('Connected to mongo db');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => console.log('Listening on port 3000'));
}

start();
