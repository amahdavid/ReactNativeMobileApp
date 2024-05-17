const request = require('supertest');
const { app, connection, validateEmail, validatePassword, generateToken } = require('@/server/server');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('uuid');
jest.mock('@/server/server');

describe('POST /api/signup', () => { 
    beforeEsch(( ) => {
        jest.clearAllMocks();
    });
})

test("SignUp_MissingPassword_ReturnsBadRequest", async () => {
    const response = await request(app)
        .post('/api/signup')
        .send({ firstName: 'John', lastName: 'Doe', email: 'johndoe@me.com' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Please fill all the fields');
});
