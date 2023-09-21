const request = require('supertest');
const app = require('./../index'); 
const mongoose = require('mongoose')

describe('Express App Tests', () => {
  it('should respond with "Hello World" on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toBe('Hello World');
  });

  it('should register a new user on POST /register', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/register')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe(newUser.username);
    expect(response.body.user.email).toBe(newUser.email);
  });


  it('should login a user on POST /login', async () => {
    const loginCredentials = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/login')
      .send(loginCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy(); // Assuming your login route returns a JWT token
  });



  // afterAll(async () => {

    it('should delete the user with chosen email /delete', async () => {
      // const response = await request(app).delete('/delete');

      // expect(response.status).toBe(200);
      // expect(response.body).toBe('Hello World');

      const checkUserMail = {
        email: 'test@example.com',
      };

      console.log(checkUserMail)

      const response = await request(app)
        .delete('/delete')
        .send(checkUserMail)
      
      console.log('response', response)

      mongoose.disconnect()

    });

  // });
});
