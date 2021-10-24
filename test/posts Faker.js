require('dotenv').config();
import request from '../config/common';
const faker = require('faker');

import { expect } from "chai";
import { 
  createRandomUser,
  createRandomUserWithfaker,
 } from '../Helper/user_helper';

 const TOKEN = process.env.USER_TOKEN;

describe('User Posts', () => {
  let postId, userId;
  before (async () => {
    userId = await createRandomUserWithfaker();
    // userId = await createRandomUser();
  });

  it('/posts', async () => {

    
        const data = {
         user_id: userId,
         title: faker.lorem.sentence(),
         body: faker.lorem.paragraphs(),
       };

        const postRes = await request
           .post('posts')
           .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);

          console.log(data);
          expect(postRes.body.data).to.deep.include(data);
          postId = postRes.body.data.id;
  });

   it('GET /posts/:id', async () => {
    await request
      .get(`posts/${postId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(200);
    });

    describe('Negative Tests', () => {
      it('401 Authentication Failed', async () => {
        const data = {
         user_id: userId,
         title: "my first post",
         body: "my body",
       };

        const postRes = await request
           .post('posts')
           .send(data);
          
          expect(postRes.body.data.message).to.eq("Authentication failed");
          expect(401);
      });

      it('422 Validation Failed', async () => {
        const data = {
         user_id: userId,
         title: "my first post",
       };

        const postRes = await request
           .post('posts')
           .set('Authorization', `Bearer ${TOKEN}`)
           .send(data);

           console.log(postRes.body);
          
          expect(postRes.body.data[0].message).to.eq("can't be blank");
          expect(postRes.body.data[0].field).to.eq("body");
          expect(422);
      });
    });
});