const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server'); 
const uniqueCountryName = `TestCountry_${Date.now()}`; // for unique country name everytime run

describe('Country API Tests', function() {
    it('should add a new country count', async function() {
        this.timeout(100000)
        const response = await supertest(app)
            .post(`/country/add/${uniqueCountryName}`)
            .send();

        expect(response.status).to.equal(200);
        expect(response.body.message).to.include('Successfully added');
        expect(response.body.country).to.equal(uniqueCountryName);
        expect(response.body.count).to.equal(1);
    });

    it('should increment the count of an existing country', async function() {
        this.timeout(100000)
        const countryName = 'TestCountry';
        const response = await supertest(app)
            .post(`/country/add/${countryName}`)
            .send();

        expect(response.status).to.equal(200);
        expect(response.body.message).to.include('Successfully incremented');
        expect(response.body.count).to.be.above(1);
    });

    it('should decrement the count of a country', async function() {
        this.timeout(100000)
        const countryName = 'TestCountry';
        const response = await supertest(app)
            .post(`/country/reduce/${countryName}`)
            .send();

        expect(response.status).to.equal(200);
        expect(response.body.message).to.include('Successfully decremented');
    });

    before(async function() {
        this.timeout(100000)
        // Ensure CountryWithZeroCount exists with count 0
        await supertest(app).post(`/country/add/CountryWithZeroCount`).send();
        await supertest(app).post(`/country/reduce/CountryWithZeroCount`).send();
    });

    it('should not decrement count below 0', async function() {
        this.timeout(100000)
        const response = await supertest(app)
            .post(`/country/reduce/CountryWithZeroCount`)
            .send();

        expect(response.status).to.equal(400); 
        expect(response.body.message).to.include('Cannot decrement');
    });

    it('should handle non-existent country', async function() {
        this.timeout(100000)
        const countryName = 'NonExistentCountry';
        const response = await supertest(app)
            .post(`/country/reduce/${countryName}`)
            .send();

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include('not found');
    });
});
