const { Op } = require("sequelize");
const { User, Category, Article } = require("../models");
const { v2: cloudinary } = require('cloudinary')


cloudinary.config({
    cloud_name: 'dcisb7ayn',
    api_key: '258396789225291',
    api_secret: 'GjyyD6fm9tLauJNOcKz0CN-yVmY'
})



class ArticleController {
  static async readArticle(req, res, next) {
    try {
      const { category, author, search, sort } = req.query;
      const paramsQuery = { include: [User, Category] };

      if (category !== "" && typeof category !== "undefined") {
        if (category) {
          if (author) {
            (paramsQuery.where = {
              categoryId: category,
              authorId: author,
            }),
              (paramsQuery.order = [["createdAt", "ASC"]]);
          } else {
            (paramsQuery.where = {
              categoryId: category,
            }),
              (paramsQuery.order = [["createdAt", "ASC"]]);
          }
        }
      } else {
        if (author !== "" && typeof author !== "undefined") {
          if (author) {
            (paramsQuery.where = {
              authorId: author,
            }),
              (paramsQuery.order = [["createdAt", "ASC"]]);
          }
        }
      }
      // console.log(category);
      // console.log(author);

      if (sort) {
        const ord = sort[0] === "-" ? "DESC" : "ASC";
        const sortBy = ord === "DESC" ? sort.slice(1) : sort;
        paramsQuery.order = [[sortBy, ord]];
      }

      // console.log(sort);

      if (search) {
        paramsQuery.where = {
          name: { [Op.iLike]: `%${search}%` },
        };
      }

      const article = await Article.findAll(paramsQuery);
      res.status(200).json({
        message: "Success Read Article",
        article,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addArticle(req, res, next) {
    try {
      console.log(req.loginInfo);
      const { userId } = req.loginInfo;
      if (!userId) throw { name: "Unauthorized" };
      // console.log(userId);
      const { title, content, imgUrl, categoryId } = req.body;
      // if(req.file){
      //     const dataImg = req.file.buffer.toString("base64")
      //     // console.log(dataImg)
      //     // console.log(req.file);
      //     const result = await imagekit.upload({
      //         file:dataImg,
      //         fileName: req.file.originalname
      //     })
      //     const article = await Article.create({
      //         title,
      //         content,
      //         imgUrl,
      //         categoryId,
      //         authorId: userId
      //     })

      // }
      const article = await Article.create({
        title,
        content,
        imgUrl,
        categoryId,
        authorId: userId,
      });

      // console.log(result);

      // console.log(req.body)
      res.status(201).json({
        message: "Success Add Article",
        article,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async articletDetail(req, res, next) {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id, {
        include: [User, Category],
      });
      // console.log(id)
      if (!article) throw { name: "Article Not Found", id };

      res.status(200).json({
        message: `Success read Article with id ${article.id}`,
        article,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteArticle(req, res, next) {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id);

      if (!article) throw ({ name: "Article Not Found", id })

      await Article.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Success Delete Article with id ${id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editArticle(req, res, next) {
    try {
      const { id } = req.params;

      const article = await Article.findByPk(id);

      if (!article) throw { name: "Article Not Found", id };

      const { title, content, imgUrl, categoryId, authorId } = req.body;
      await Article.update(
        { title, content, imgUrl, categoryId, authorId },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: `Success Update Article with id ${id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchImageUrl(req, res, next) {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id);

      if (!article) throw { name: "Article Not Found", id };

      // console.log(req.file)
      const base64 = req.file.buffer.toString("base64");
      // console.log(base64,">>>>>>>>>>>>>>>>>>>>>>>>>>.");
      const base64url = `data:image/png;base64,${base64}`
      // console.log(base64url,"??????????????????????????????????????????????????????????????")
      let result = await cloudinary.uploader.upload(base64url);

      const imgUrl = result.url;

     await Article.update(
        { imgUrl :result.url },
        {
          where: {
            id,
          }
        }
      );

      res.status(200).json({
        message: `Success Update Article with id ${id}`,
        
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ArticleController;
