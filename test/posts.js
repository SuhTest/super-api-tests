import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v1/');

import { expect } from "chai";
import { createRandomUser } from './../Helper/user_helper';

const TOKEN = '4f3e79960947d93316b5d4e58481bb0a04297970ca9e1cbecb8964eb29d55aeb';

describe('User Posts', () => {
  let postId, userId;
  before (async () => {
    userId = await createRandomUser();
  });

  it('/posts', async () => {

        const data = {
         user_id: userId,
         title: "my first post",
         body: "my body",
       };

        const postRes = await request
           .post('posts')
           .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);

          console.log(postRes.body);
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