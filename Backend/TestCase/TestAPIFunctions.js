const axios = require('axios');

class TestAPIFunctions {
  constructor() {
    this.base_url = 'http://localhost:4004';
    this.token = '';
  }

  async setUp() {
    const registrationUrl = `${this.base_url}/register`;
    const registrationData = {
      Name: 'John',
      Gender: 'Male',
      Age: 25,
      Nationality: 'US',
      Password: 'password123',
      Email: 'john@example.com',
    };

    const registrationResponse = await axios.post(registrationUrl, registrationData);
    expect(registrationResponse.status).toBe(201);

    const loginUrl = `${this.base_url}/login`;
    const loginData = {
      Email: 'john@example.com',
      Password: 'password123',
    };

    const loginResponse = await axios.post(loginUrl, loginData);
    expect(loginResponse.status).toBe(201);

    this.token = loginResponse.headers['set-cookie'][0].split('=')[1].split(';')[0];
  }

  async tearDown() {
    const deleteUrl = `${this.base_url}/removeByEmail`;
    const headers = { Authorization: `Bearer ${this.token}` };

    const deleteResponse = await axios.delete(deleteUrl, {
      headers,
      data: { Email: 'john@example.com' },
    });
    expect(deleteResponse.status).toBe(200);
  }
}

module.exports = TestAPIFunctions;
