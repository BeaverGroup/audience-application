const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');

//create user datat
// describe('Auth API - Register User before userTest', () => {
//     it('should successfully register a new user', async function() {
//       this.timeout(100000);
//       const userData = {
//         Name: 'TestSan',
//         Gender: 'Female',
//         Age: 20,
//         Nationality: 'Thai',
//         Email: 'santest2@gmail.com',
//         Password: 'test12345'
//       };
  
//       const response = await supertest(app).post('/auth/register').send(userData);
//       expect(response.status).to.equal(201);
//       expect(response.body).to.have.property('token');
//       expect(response.body.message).to.equal('User account created successfully.');
//     });
// });


describe('User API - User Information Retrieval', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluU2FuQGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4Y2Y2MTI5MmFhM2QzNThkZjM2OSIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDIxNCwiZXhwIjoxNzg2OTY0MjE0fQ.CThH84dvA-ChTX_pZUpL0owXRJXjOCOd7OpilCmH0q8'; // Replace with a valid token for authentication

    it('should retrieve user information by email', async function() {
        this.timeout(10000)
        const userEmail = 'adminSan@gmail.com'; // Replace with an existing user's email Token end in 3 days
        const response = await supertest(app)
            .get(`/user/infoByEmail/${userEmail}`)
            .set('Cookie', `authToken=${validToken}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('info');
        expect(response.body.info).to.have.property('Email', userEmail);
    });

    it('should retrieve user information by ID', async function() {
        this.timeout(10000)
        const userId = '655db89e394c2189f62f1529'; // Replace with an existing user's ID Token end in 3 days
        const response = await supertest(app)
            .get(`/user/infoByID/${userId}`)
            .set('Cookie', `authToken=${validToken}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('info');
        expect(response.body.info).to.have.property('_id', userId);
    });

});
describe('User API - All User Information', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluU2FuQGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4Y2Y2MTI5MmFhM2QzNThkZjM2OSIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDIxNCwiZXhwIjoxNzg2OTY0MjE0fQ.CThH84dvA-ChTX_pZUpL0owXRJXjOCOd7OpilCmH0q8'
    it('should retrieve all user information', async function() {
        this.timeout(10000)
        const response = await supertest(app)
            .get(`/user/list`)
            .set('Cookie', `authToken=${validToken}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('Data');
        expect(response.body.Data).to.be.an('array');
    });

})

describe('User API - Update User By Email', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluU2FuQGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4Y2Y2MTI5MmFhM2QzNThkZjM2OSIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDIxNCwiZXhwIjoxNzg2OTY0MjE0fQ.CThH84dvA-ChTX_pZUpL0owXRJXjOCOd7OpilCmH0q8'; //admin token

    it('should update a user by email', async function() {
        this.timeout(10000)
        const updateData = {
            Name: 'adminSan',
            Gender: 'Male',
            Age: 21,
            Nationality: 'yoo',
            Email: 'adminSan@gmail.com' // Existing user's email
        };

        const response = await supertest(app)
            .post('/user/updateByEmail')
            .set('Cookie', `authToken=${validToken}`)
            .send(updateData);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('User updated');
        expect(response.body.user.Email).to.equal(updateData.Email);
        expect(response.body.user.Name).to.equal(updateData.Name);
    });
});

describe('User API - Update User By ID', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluU2FuQGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4Y2Y2MTI5MmFhM2QzNThkZjM2OSIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDIxNCwiZXhwIjoxNzg2OTY0MjE0fQ.CThH84dvA-ChTX_pZUpL0owXRJXjOCOd7OpilCmH0q8'; //admin token
    const userIdToUpdate = '655c8cf61292aa3d358df369'; // admin id for test

    it('should update a user by ID', async function() {
        const updateData = {
            Name: 'adminSan',
            Gender: 'Male',
            Age: 35,
            Nationality: 'yoo',
            _id: userIdToUpdate
        };

        const response = await supertest(app)
            .post('/user/updateByID')
            .set('Cookie', `authToken=${validToken}`)
            .send(updateData);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('User updated');
        expect(response.body.user._id).to.equal(userIdToUpdate);
        expect(response.body.user.Name).to.equal(updateData.Name);
    });
});

describe('User API - Remove User By Email', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluU2FuQGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4Y2Y2MTI5MmFhM2QzNThkZjM2OSIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDIxNCwiZXhwIjoxNzg2OTY0MjE0fQ.CThH84dvA-ChTX_pZUpL0owXRJXjOCOd7OpilCmH0q8'; //admin token
    const emailToRemove = 'santest2@gmail.com'; // Replace with the email of the user to be removed
    before(async function() {
        this.timeout(100000); 
        const userData = {
            Name: 'TestSan',
            Gender: 'Female',
            Age: 20,
            Nationality: 'Thai',
            Email: 'santest2@gmail.com',
            Password: 'test12345'
        };
        await supertest(app).post('/auth/register').send(userData);
        
    });

    it('should remove a user by email', async function() {
        this.timeout(1000000)
        const response = await supertest(app)
            .delete('/user/removeByEmail')
            .set('Cookie', `authToken=${validToken}`)
            .send({ Email: emailToRemove });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.include('User is removed');
        expect(response.body.info.Email).to.equal(emailToRemove);


    });
});
let userIdTobeRemove;

describe('User API - Remove User By ID', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluU2FuQGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4Y2Y2MTI5MmFhM2QzNThkZjM2OSIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDIxNCwiZXhwIjoxNzg2OTY0MjE0fQ.CThH84dvA-ChTX_pZUpL0owXRJXjOCOd7OpilCmH0q8'; // Replace with an admin token
    before(async function() {
        this.timeout(100000); // Adjust timeout as needed
        const userData = {
            Name: 'TestSan',
            Gender: 'Female',
            Age: 20,
            Nationality: 'Thai',
            Email: 'santest2@gmail.com', // Make sure this email is unique
            Password: 'test12345'
        };
        const userResponse = await supertest(app).post('/auth/register').send(userData);
        const userIdTobeRemove = userResponse.body.user._id; // Retrieve the _id of the newly created user
        it('should remove a user by ID', async function() {
            this.timeout(100000); // Adjust timeout as needed
            const response = await supertest(app)
                .delete('/user/removeByID')
                .set('Cookie', `authToken=${validToken}`)
                .send({ _id: userIdTobeRemove });
    
            expect(response.status).to.equal(200);
            expect(response.body.message).to.include('User is removed');
            expect(response.body.info._id).to.equal(userIdTobeRemove);
        });
    });
});


