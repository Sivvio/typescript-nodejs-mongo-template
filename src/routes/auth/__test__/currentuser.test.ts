import request from 'supertest';

import {app} from '../../../app';

it('responds with details of current user', async () => {
    const jwt = await global.signin();

    const response = await request(app)
        .get('/api/auth/currentuser')
        .set('Authorization', `${jwt}`)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds withnull if not auth', async () => {
    const response = await request(app)
        .get('/api/auth/currentuser')
        .send()
        .expect(200);

    expect(response.body.currentUser).toBeNull();
});
