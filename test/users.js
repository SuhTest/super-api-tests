import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v1/');

import { expect } from "chai";
import { it } from "mocha";

const TOKEN = '9af2817fad64e55566be189edbac248d1c110923ae298d52136877252bc124bc';

describe('Users', () => {
  it('GET /users', () => {
    // request
    // .get(`users?access-token=${TOKEN}`).end((err, res) => { //30ms
    //   expect(res.body.data).to.not.be.empty;
    //   done();
    // });

    return request
      .get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
  });

  it('GET /users/:id', () => {
    return request
      .get(`users/120?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data.id).to.be.eq(120);
      });
  });

  it('GET /users with query params', () => {
    const url = `users?access-token=${TOKEN}&page=6&gender=female&status=active`;

    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq('female');
        expect(data.status).to.eq('active');
      });
    });
  });

  it('POST /users', () => {
    const data = {
      email: `sutest${Math.floor(Math.random() * 9999)}@gmail.hk`,
      name: 'sutest02',
      gender: 'female',
      status: 'inactive',
    };

    return request
      .post('users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data).to.deep.include(data);
      });
  });

  it('PUT /users/:id', () => {
    const data = {
      name: `Singh - ${Math.floor(Math.random() * 9999)}`,
      status: 'inactive',
    };

    return request
      .put('users/132')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body.data);
        expect(res.body.data).to.deep.include(data);
      });
  });

  it('DELETE /users/:id', () => {
    return request
      .delete('users/5411')
      .set('Authorization', `Bearer ${TOKEN}`)
      .then((res) => {
        expect(res.statusCode).to.eq(204);
      });
  });
});
