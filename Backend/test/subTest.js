const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server'); 
const { user_model } = require('../Models/userModel');

async function removeSubscriptionFromUser(userId, sport) {
    try {
        const user = await user_model.findById(userId);
        if (!user || !user.Subscribe.includes(sport)) {
            console.log(`User not found or not subscribed to ${sport}`);
            return;
        }

        user.Subscribe.splice(user.Subscribe.indexOf(sport), 1);
        await user.save();
        console.log(`Successfully unsubscribed ${sport} from ${userId}`);
    } catch (err) {
        console.error(`Error while removing subscription: ${err}`);
    }
}

describe('Subscription API - Add Subscription', () => {
    const validUserId = '655c8def1292aa3d358df376'; // Actual user ID from database
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluT2F0QGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4ZGVmMTI5MmFhM2QzNThkZjM3NiIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDQ2NCwiZXhwIjoxNzg2OTY0NDY0fQ.VxSDpARvNeSMyo3i372CqEsqvFlgIT9t288Pc2nmMcw'; // token that not 3 days expired
    before(async function() {
        this.timeout(10000)
        await removeSubscriptionFromUser(validUserId, 'Kendo');
    });
    
    it('should successfully add a subscription', async function() {
        this.timeout(100000)
        const response = await supertest(app)
            .post(`/user/subscribe/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`)
            .send({ Sport: 'Kendo' }); 

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully subscribed to Kendo.');
    });

    it('should not allow duplicate subscription', async function() {
        this.timeout(100000)
        const response = await supertest(app)
            .post(`/user/subscribe/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`)
            .send({ Sport: 'Kendo' }); 

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('You are already subscribed to Kendo.');
    });

    it('should return an error for invalid user ID', async function() {
        this.timeout(100000)
        const invalidUserId = '655c8def1292aa3d358df375'; // invalid user ID
        const validToken2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNhbnRlc3R1c2VyMkBnbWFpbC5jb20iLCJfaWQiOiI2NTVlNDg4NWQ5YTUyOGFmMjY0YWRkMGEiLCJSb2xlIjoiVXNlciIsImlhdCI6MTcwMDY3Nzc2NiwiZXhwIjoxNzAwOTM2OTY2fQ.934kK28yJjEFmMhcm0tc03074LJ06qdzi6qoMqoQC6Y'; // already set token to expired 1000 days
        const response = await supertest(app)
        .post(`/user/subscribe/${invalidUserId}`)
            .set('Cookie', `authToken=${validToken2}`)
            .send({ Sport: 'Football' });

        expect(response.status).to.equal(401); 
    });

    it('should retrieve all subscriptions for a user', async function() {
        this.timeout(100000)
        const response = await supertest(app)
            .get(`/user/userAllsub/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('subscribe');
        expect(response.body.subscribe).to.be.an('array');
    });

    it('should update subscriptions for a user', async function() {
        this.timeout(100000)
        const newSubscriptions = ['Basketball', 'Tennis'];

        const response = await supertest(app)
            .post(`/user/updateSub/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`)
            .send({ Sport: newSubscriptions });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully updated subscriptions.');

        const verifyResponse = await supertest(app)
            .get(`/user/userAllsub/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`);

        expect(verifyResponse.status).to.equal(200);
        expect(verifyResponse.body.subscribe).to.deep.equal(newSubscriptions);
    });

});
