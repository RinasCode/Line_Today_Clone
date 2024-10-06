const req = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { User } = require("../models");
const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals")

beforeAll(async () => {
    const user = require("../data/User.json")
    user.forEach(el => {
        el.password = hash(el.password),
        el.updatedAt = el.createdAt = new Date()
    })

    await User.bulkCreate(user)
})

afterAll(async () => {
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
})

describe("Post /login", () => {
    describe("Post /login - Success", () => {
        test("Success Login", async () => {
            const data = {
                "email": "rina@mail.com",
                "password": "12345",
            }
            const res = await req(app).post("/login").send(data)
            // console.log(response.body);
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("access_token", expect.any(String))
            // console.log(res.body);
        })
    })

    describe("Post /login - Failed", () => {
        test("Email Undefined", async () => {
            const data = {
                "email": "",
                "password": "12345",
            }

            const res = await req(app).post("/login").send(data)
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", expect.any(String))
        })

        test("Password Undefined", async () => {
            const data = {
                "email": "rina@mail.com",
                "password": ""
            }

            const res = await req(app).post("/login").send(data)
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", expect.any(String))
            // console.log(res.body);
        })

        test("Email Not Found", async () => {
            const data = {
                "email": "siapaadmin@adminyaini.com",
                "password": "admin",
            }
            const res = await req(app).post("/login").send(data)
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", expect.any(String))
            // console.log(res.body);
        })

        test("Password Incorrect", async () => {
            const data = {
                "email": "rina@mail.com",
                "password": "admin12333",
            }
            const res = await req(app).post("/login").send(data)
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", expect.any(String))
            console.log(res.body);
        })
    })
})

