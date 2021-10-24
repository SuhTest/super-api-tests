import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v1/');

import { expect } from "chai";
import { it } from "mocha";

const TOKEN = '9af2817fad64e55566be189edbac248d1c110923ae298d52136877252bc124bc';

describe('Users', () => {
  let userId;

  describe('POST', () => {
    it('/users', () => {
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
        expect(res.body.data).to.deep.include(data);
        userId = res.body.data.id;
        console.log(userId);
      });
    });
  });
  
  describe('GET', () => {
    it('/users', () => {
      return request
      .get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it('/users/:id', () => {
      return request
      .get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data.id).to.be.eq(userId);
      });
   });

   it('/users with query params', () => {
    const url = `users?access-token=${TOKEN}&page=6&gender=female&status=active`;

    return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
          expect(data.gender).to.eq('female');
          expect(data.status).to.eq('active');
         });
      });
     });
   });
  
  describe('PUT', () => {
    it('/users/:id', () => {
    const data = {
      name: `Singh - ${Math.floor(Math.random() * 9999)}`,
      status: 'active'
    };

    return request
      .put(`users/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body.data);
        expect(res.body.data).to.deep.include(data);
        });
    });
  });
  
  describe('DELETE', () => {
    it('/users/:id', () => {
      return request
      .delete(`users/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .then((res) => {
        expect(res.statusCode).to.eq(204);
      });
    });
  });
});
