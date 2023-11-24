const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const { user_model } = require('../Models/userModel');

async function removeVoteFromUser(userId, matchID) {
    try {
        const user = await user_model.findById(userId);
        if (!user || !user.Votes.some(vote => vote.matchID === matchID)) {
            console.log(`Vote for matchID ${matchID} not found for user ${userId}`);
            return;
        }
        user.Votes = user.Votes.filter(vote => vote.matchID !== matchID);
        await user.save();
        console.log(`Vote for matchID ${matchID} removed for user ${userId}`);
    } catch (err) {
        console.error(`Error while removing vote: ${err}`);
    }
}

describe('Vote API - Add and Remove Vote', () => {
    const validUserId = '655c8cf61292aa3d358df369'; // Replace with an actual user ID from your database
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluU2FuQGdtYWlsLmNvbSIsIl9pZCI6IjY1NWM4Y2Y2MTI5MmFhM2QzNThkZjM2OSIsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMDU2NDIxNCwiZXhwIjoxNzg2OTY0MjE0fQ.CThH84dvA-ChTX_pZUpL0owXRJXjOCOd7OpilCmH0q8';

    before(async function() {
        this.timeout(10000)
        // Remove existing votes to ensure a clean state for tests
        await removeVoteFromUser(validUserId, 'match1');
    });

    it('should successfully add a vote', async function() {
        this.timeout(100000)
        const voteData = {
            matchID: 'match1',
            vote: 'teamA'
        };

        const response = await supertest(app)
            .post(`/user/vote/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`)
            .send(voteData);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(`Successfully voted for matchID ${voteData.matchID}.`);
    });

    it('should not allow duplicate votes', async function() {
        this.timeout(100000)
        const response = await supertest(app)
            .post(`/user/vote/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`)
            .send({ matchID: 'match1', vote: 'teamA' });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(`You have already voted for matchID match1.`);
    });

    it('should successfully remove a vote', async function() {
        this.timeout(100000)
        const response = await supertest(app)
            .delete(`/user/unvote/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`)
            .send({ matchID: 'match1' });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(`Successfully removed your vote for matchID match1.`);
    });

    it('should retrieve all votes for a user', async function() {
        this.timeout(100000)
        await supertest(app)
            .post(`/user/vote/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`)
            .send({ matchID: 'match1', vote: 'teamA' });

        const response = await supertest(app)
            .get(`/user/userAllvote/${validUserId}`)
            .set('Cookie', `authToken=${validToken}`);

        expect(response.status).to.equal(200);
        expect(response.body.votes).to.deep.include({ matchID: 'match1', vote: 'teamA' });
    });
    
});


