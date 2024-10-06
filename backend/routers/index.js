const express = require("express");
const router = express.Router();

const categoryRouter = require("../routers/category");
const articleRouter = require("../routers/article");
const UserController = require("../controllers/UserController");
const PublicController = require("../controllers/PublicController");
const authentication = require("../middleware/authentification");
const errorHandler = require("../middleware/errorHandler");
const { adminAuthorization } = require("../middleware/authorization");

//CRUD Users
router.get("/public/article", PublicController.readArticle);
router.get("/public/article/:id",PublicController.ReadByiD)
router.post("/login", UserController.loginUser);

router.use(authentication);
router.use("/category", categoryRouter);
router.use("/article", articleRouter);
router.post("/add-user", adminAuthorization, UserController.addUser);

router.use(errorHandler);

module.exports = router;
