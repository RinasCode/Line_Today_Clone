const req = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { Category, Article, User } = require('../models')
const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals");
const { token } = require("../helpers/jwt");

let admin_token
let staff_token

beforeAll(async () => {
    //Seeding Data User
    const user = require("../data/User.json")
    user.forEach(el => {
        el.password = hash(el.password)
        el.updatedAt = el.createAt = new Date()
    })
    // console.log(user);

    //Seeding Data Article
    const article = require("../data/Article.json")
    article.forEach(el => {
        el.updatedAt = el.createAt = new Date()
    })
    // console.log(article);

    //Seeding Data Category
    const category = require("../data/Category.json")
    category.forEach(el => {
        el.updatedAt = el.createAt = new Date()
    })
    // console.log(category);

    //Suntik Data User
    await User.bulkCreate(user)
    //Suntik Data Category
    await Category.bulkCreate(category)
    //Suntik Data Article
    await Article.bulkCreate(article)

    const Admin = {
        "id": 1,
        "username": "rina",
        "email": "rina@mail.com",
        "password": "12345",
        "role": "Admin",
        "phoneNumber": "0813-1918-9089",
        "address": "Bintaro"
    }
    admin_token = token(Admin)

    const Staff = {
        "id": 2,
        "username": "janeSmith",
      "email": "jane.smith@example.com",
      "password": "12345",
      "role": "Staff",
      "phoneNumber": "234-567-8901",
      "address": "456 Elm St, Springfield"
    }
    staff_token = token(Staff)
})

afterAll(async () => {
    //Reset isi Table User
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    //Reset isi Table Category
    await Category.destroy({ truncate: true, cascade: true, restartIdentity: true })
    //Reset isi Table Article
    await Article.destroy({ truncate: true, cascade: true, restartIdentity: true })
})

describe("Post /article", () => {
    //Add article
    describe("Post /article - Success Add Article", () => {
        test("Return message Success Add Article", async () => {
            const data = {
                "title": "Advancements in AI Technology",
                "content": "Recent advancements in AI technology are transforming various industries, from healthcare to finance. Artificial intelligence (AI) has been a major driving force behind many innovations, and its impact is only expected to grow in the coming years. In healthcare, AI is being used to improve diagnostic accuracy, personalize treatment plans, and streamline administrative tasks. For instance, AI algorithms can analyze medical images with incredible precision, helping doctors detect diseases at an early stage. In finance, AI is revolutionizing the way we manage investments and detect fraud. AI-powered robo-advisors provide personalized investment advice, while machine learning models can identify suspicious transactions in real-time, protecting consumers from potential threats. As AI continues to evolve, it is crucial for businesses and individuals to stay informed about the latest developments and understand how to leverage this powerful technology.",
                "imgUrl": "https://example.com/img/ai-technology.jpg",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).post('/article').send(data).set('authorization', `Bearer ${admin_token}`)
            // console.log(res.body);
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Success Add Article")
        })
    })
    //Failed Add
    describe("Post /article - Failed to Add Article", () => {
        test("Failed to Add Article, Please Login First", async () => {
            const data = {
                "title": "hahaha",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).post('/article').send(data)
            // console.log(res.body);
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please Login First")
        })

        test("Failed to Add Article, Invalid Token", async () => {
            const data = {
                "title": "hahaha",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).post('/article').send(data).set('authorization', `Bearer InvalidToken`)
            // console.log(res.body);
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please Login First")
        })

        test("Failed to Add Article, Invalid Data", async () => {
            const data = {
                "title": "",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": "837",
                "authorId": 1
            }
            const res = await req(app).post('/article').send(data).set('authorization', `Bearer ${admin_token}`)
            console.log(res.body);
            expect(res.status).toBe(400)
            // expect(res.body).toHaveProperty()
            expect(res.body).toBeInstanceOf(Object)
        })
    })

    //Edit Article
    describe("Put /article - Success Update Article", () => {
        test("Return message Success Update Article", async () => {
            const data = {
                "title": "hahaha",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).put('/article/4').send(data).set("authorization", `Bearer ${admin_token}`)
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Success Update Article with id 4")
        })
    })
    //Failed Edit Article
    describe("Post /article - Failed to Udpate Article", () => {
        test("Failed to Update Article, Please Login First", async () => {
            const data = {
                "title": "hahaha",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).put('/article/4').send(data)
            // console.log(res.body);
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please Login First")
        })

        test("Failed to Add Article, Invalid Token", async () => {
            const data = {
                "title": "hahaha",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).put('/article/4').send(data).set('authorization', `Bearer InvalidToken`)
            // console.log(res.body);
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please Login First")
        })

        test("Failed to Update Article, Article Not Found", async () => {
            const data = {
                "title": "hahaha",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).put('/article/100').send(data).set("authorization", `Bearer ${admin_token}`)
            // console.log(res.body);
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Article Not Found")
        })

        test("Failed to Update Article, You dont have Access", async () => {
            const data = {
                "title": "hahaha",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).put('/article/4').send(data).set("authorization", `Bearer ${staff_token}`)
            // console.log(res.body);
            expect(res.status).toBe(403)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "You dont have Access")
        })

        test("Failed to Update Article, Invalid Data", async () => {
            const data = {
                "title": "",
                "content": "hehehe",
                "imgUrl": "wkwkwkwk",
                "categoryId": 1,
                "authorId": 1
            }
            const res = await req(app).put('/article/4').send(data).set('authorization', `Bearer ${admin_token}`)
            // console.log(res.body);
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
        })
    })

    //Delete
    describe("Delete /article - Success to Delete Article", () => {
        test("Success to delete Article", async () => {
            const res = await req(app).delete('/article/6').set("authorization", `Bearer ${admin_token}`)
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Success Delete Article with id 6")
        })
    })

    //Failed Delete
    describe("Delete /article - Failed to Delete Article", () => {
        test("Failed to delete Article, Please Login First", async () => {
            const res = await req(app).delete('/article/1')
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please Login First")
        })

        test("Failed to delete Article, Invalid Token", async () => {
            const res = await req(app).delete('/article/1').set("authorization", `Bearer InvalidToken`)
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please Login First")
        })

        test("Failed to delete Artilce, Article Not Found", async () => {
            const res = await req(app).delete('/article/100').set("authorization", `Bearer ${admin_token}`)
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Article Not Found")
        })

        test("Failed to delete Article, You Dont Have Access", async () => {
            const res = await req(app).delete('/article/1').set("authorization", `Bearer ${staff_token}`)
            expect(res.status).toBe(403)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "You dont have Access")
        })
    })

    

})

