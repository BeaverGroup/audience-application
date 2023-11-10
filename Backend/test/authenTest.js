const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Make sure to replace this with the path to your express app
const { user_model } = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const expect = chai.expect;

chai.use(chaiHttp);

describe('User Controller Tests', () => {
  beforeEach(async () => {
    // Clean up the database or set up a test database if needed
    await user_model.deleteMany({});
  });

  describe('POST /registerUser', () => {
    it('should register a new user', async () => {
      const userData = {
        Name: 'John Doe',
        Gender: 'Male',
        Age: 25,
        Nationality: 'US',
        Password: 'password123',
        Email: 'john.doe@example.com',
      };

      const response = await chai.request(server)
        .post('/registerUser')
        .send(userData);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('message').equal('User account created successfully.');
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('Name').equal(userData.Name);
      expect(response.body.user).to.have.property('Gender').equal(userData.Gender);
      // Add more assertions based on your user model and response structure
    });

    it('should handle duplicate email registration', async () => {
      // Register a user with the same email first
      const existingUser = {
        Name: 'Jane Doe',
        Gender: 'Female',
        Age: 30,
        Nationality: 'CA',
        Password: 'password456',
        Email: 'jane.doe@example.com',
      };

      await chai.request(server)
        .post('/registerUser')
        .send(existingUser);

      // Try to register a user with the same email again
      const duplicateUser = {
        Name: 'John Doe',
        Gender: 'Male',
        Age: 25,
        Nationality: 'US',
        Password: 'password123',
        Email: 'jane.doe@example.com', // Same email as existingUser
      };

      const response = await chai.request(server)
        .post('/registerUser')
        .send(duplicateUser);

      expect(response).to.have.status(409);
      expect(response.body).to.have.property('message').equal('Email is already used');
    });

    // Add more test cases for different scenarios (e.g., missing fields, invalid data, etc.)
  });
});