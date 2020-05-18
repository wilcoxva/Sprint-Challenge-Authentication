const app = require("./auth-router");
const supertest = require('supertest')
const request = supertest(app)

describe("Auth Router Register test units", () => {

    it("returns json", () => {
        request.post('/api/auth/register').send({ "username": "wilcoxva", "password": "1234" }).expect('Content-Type', /json/).end();

          
    })

    it("expects 201", () => {
        request.post('/api/auth/register').send({ "username": "asdf", "password": "1234" }).expect(201).end();

    })
})

describe("Auth Router Login test units", () => {

    it("returns json", () => {
        request.post('/api/auth/login').send({ "username": "wilcoxva", "password": "1234" }).expect('Content-Type', /json/).end();

          
    })

    it("expects 400", () => {
        request.post('/api/auth/login').send({ "username": "asdf", "password": "1234" }).expect(400).end();

    })
})