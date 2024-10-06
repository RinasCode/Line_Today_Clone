const express = require("express")
const CategoryController = require("../controllers/CattegoriesController")
const { adminAuthorization } = require("../middleware/authorization")
const router = express.Router()

//CRUD Category
router.get("/", CategoryController.readCategory)
router.post("/", adminAuthorization,CategoryController.addCategory)
router.delete("/:id",adminAuthorization,CategoryController.deleteCategory)
router.put("/:id", adminAuthorization,CategoryController.editCategory)

module.exports = router