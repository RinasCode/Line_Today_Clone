const express = require("express");
const ArticleController = require("../controllers/ArticleController");
const { articleAuthorization } = require("../middleware/authorization");
const upload = require('../utils/multer')
const router = express.Router()


router.get("/", ArticleController.readArticle);

router.post("/", ArticleController.addArticle);
router.get("/:id", ArticleController.articletDetail);
router.delete("/:id", articleAuthorization, ArticleController.deleteArticle);
router.put("/:id", articleAuthorization, ArticleController.editArticle);
router.patch("/:id",upload.single("imgUrl"), ArticleController.patchImageUrl);

module.exports = router;
