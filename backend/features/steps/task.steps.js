const {Given, When, Then} = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../../index');
// const {assert} = require('chai');
const assert = require('assert');
// import {assert} from 'chai';

let response;

Given('the system is running', () => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
})

When('I send a POST request to {string} with:', async(route, dataTable) => {
    const data = dataTable.rowsHash();
    console.log(data)
    response = await request(app).post(route).send(data);
});

Then('the response status should be {int}', (status) => {
    assert.strictEqual(response.status, status);
})

Then('the response status should contain {string}', (message) => {
    console.log(response.body.message, message);
    assert.match(response.body.message, new RegExp(message));
})
