import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../src/app";
import request from "supertest";
import {initConfig} from "../config/config";
import * as dotenv from "dotenv";

dotenv.config({ path: `./.env.test`});

declare global {
    var signin: () => Promise<string>;
}

let mongo: any;

beforeAll(async () => {
    initConfig();

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});


global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            email: email,
            password: password
        })
        .expect(201);

    return response.get('Authorization');
};
