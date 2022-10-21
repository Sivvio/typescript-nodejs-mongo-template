import request from 'supertest';

import {app} from '../../../app';

it('fails when a non existing email is supplied', async () => {
    return request(app)
        .post('/api/auth/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when an incorrect is supplied', async () => {
    await request(app)
        .post('/api/auth/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    return request(app)
        .post('/api/auth/signin')
        .send({
            email: 'test@test.com',
            password: 'madeup password'
        })
        .expect(400);
});

it('should return a cookie when credentials are correct', async () => {
    await request(app)
        .post('/api/auth/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/auth/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Authorization')).toBeDefined();
});
