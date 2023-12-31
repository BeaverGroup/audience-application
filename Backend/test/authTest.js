const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const nock = require('nock');
const { user_model } = require('../Models/userModel')

async function removeUserfromdata(user_email) {
  try {
    const result = await user_model.findOneAndRemove({ "Email": user_email });
    if (result) {
      console.log(`User with email: ${user_email} was successfully removed.`);
      return result;
    } else {
      console.log(`User with email: ${user_email} is not found.`);
      return null;
    }
  } catch (err) {
    console.error(`Error while removing user by email: ${err}`);
    return null;
  }
}

describe('Auth API - Register User', () => {
  const email = 'test@example203.com';
  before(async function() {
    this.timeout(10000)
    await removeUserfromdata(email);
  });
  it('should successfully register a new user', async function() {
    this.timeout(100000);
    const userData = {
      Name: 'Test User',
      Gender: 'Female',
      Age: 30,
      Nationality: 'Testland',
      Email: 'test@example203.com',
      Password: 'Password123'
    };

    const response = await supertest(app).post('/auth/register').send(userData);
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('User account created successfully.');
  });

  it('should not allow registration with an already used email', async function() {
    this.timeout(100000);
    const userData = {
      Name: 'Test User',
      Gender: 'Female',
      Age: 30,
      Nationality: 'Testland',
      Email: 'test@example.com',
      Password: 'Password123'
    };
    const response = await supertest(app).post('/auth/register').send(userData);
    expect(response.status).to.equal(409);
    expect(response.body.message).to.equal('Email is already used');
  });
});

describe('Auth API - Login User', () => {
  it('should successfully log in a user', async function() {
    this.timeout(100000);
    const loginData = {
      Email: 'test@example.com',
      Password: 'Password123'
    };
    const response = await supertest(app).post('/auth/login').send(loginData);
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('User account created successfully.');
  });

  it('should not log in a user with an incorrect password', async function() {
    this.timeout(100000);
    const loginData = {
      Email: 'test@example.com',
      Password: 'password55'
    };
    const response = await supertest(app).post('/auth/login').send(loginData);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('Password is wrong');
  });

  it('should not log in a user with an email that does not exist', async function() {
    this.timeout(100000);
    const loginData = {
      Email: 'noemail@gmail.com',
      Password: 'nopass1234'
    };
    const response = await supertest(app).post('/auth/login').send(loginData);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('Email is not found');
  });
});


