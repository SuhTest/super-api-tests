import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v1/');
const faker = require('faker');

import { expect } from "chai";

const TOKEN = '4f3e79960947d93316b5d4e58481bb0a04297970ca9e1cbecb8964eb29d55aeb';

export const createRandomUserWithfaker = async () => {
  const userData = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: 'female',
    status: 'inactive',
 };
  const res = await request
   .post('users')
   .set('Authorization', `Bearer ${TOKEN}`)
   .send(userData)

   console.log(res.body);

  return res.body.data.id;
};

export const createRandomUser = async () => {
  const userData = {
    email: `sutest${Math.floor(Math.random() * 9999)}@gmail.hk`,
    name: 'sutest02',
    gender: 'female',
    status: 'inactive',
 };
  const res = await request
   .post('users')
   .set('Authorization', `Bearer ${TOKEN}`)
   .send(userData)

  return res.body.data.id;
};