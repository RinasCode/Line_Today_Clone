const req = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { Category, Article, User } = require('../models');
const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals");

beforeAll(async () => {
    // Seeding Data User
    const user = require("../data/User.json");
    user.forEach(el => {
        el.password = hash(el.password);
        el.updatedAt = el.createdAt = new Date();
    });

    // Seeding Data Article
    const article = require("../data/Article.json");
    article.forEach(el => {
        el.updatedAt = el.createdAt = new Date();
    });

    // Seeding Data Category
    const category = require("../data/Category.json");
    category.forEach(el => {
        el.updatedAt = el.createdAt = new Date();
    });

    // Inject Data
    await User.bulkCreate(user);
    await Category.bulkCreate(category);
    await Article.bulkCreate(article);
});

afterAll(async () => {
    // Reset Tables
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Category.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Article.destroy({ truncate: true, cascade: true, restartIdentity: true });
});

describe("Get /public/article", () => {
    // Success Read Articles
    test("Success Read Article", async () => {
        const res = await req(app).get('/public/article');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Success Read Articles");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toBeInstanceOf(Array);
    });

    // Read Article with Category Filter
    test("Read Article with Category Filter", async () => {
        const res = await req(app).get('/public/article?category=1');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Success Read Articles");
        expect(res.body.data).toBeInstanceOf(Array);
    });

    // Read Article with Author Filter
    test("Read Article with Author Filter", async () => {
        const res = await req(app).get('/public/article?author=1');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Success Read Articles");
        expect(res.body.data).toBeInstanceOf(Array);
    });

    // Read Article with Search Filter
    test("Read Article with Search Filter", async () => {
        const res = await req(app).get('/public/article?search=Advancements');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Success Read Articles");
        expect(res.body.data).toBeInstanceOf(Array);
    });

    // Read Article with Sorting
    test("Read Article with Sorting", async () => {
        const res = await req(app).get('/public/article?sort=-createdAt');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Success Read Articles");
        expect(res.body.data).toBeInstanceOf(Array);
    });

    // Read Article with Pagination
    test("Read Article with Pagination", async () => {
        const res = await req(app).get('/public/article?page[number]=1&page[data]=10');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Success Read Articles");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body).toHaveProperty("totalProducts");
        expect(res.body).toHaveProperty("totalPage");
        expect(res.body).toHaveProperty("productsPerPage", 10);
    });
});
