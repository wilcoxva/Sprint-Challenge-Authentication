const app = require("./auth-router");
const supertest = require('supertest')
const request = supertest(app)

describe("Auth Router test units", () => {
    let item1;
    beforeEach(() => {
        item1 = {
            "username": "wilcoxva",
            "password": "1234"
        }
    })

    it("/register", async () => {
        const response = await request.post('/api/auth/register')

        expect(response.status).toBe(201)
    })
})