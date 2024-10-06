const { User,Article,Category } = require("../models")

async function articleAuthorization(req, res, next) {
    try {
        const { userId, role } = req.loginInfo

        // console.log(userId, role);

        if (role === "Staff") {

            // console.log(req.params);

            const user = await User.findByPk(userId)

            // console.log(user);

            if (!user) throw { name: "Forbidden" }

            const { id } = req.params
            // console.log(id);
            const slcArticle = await Article.findByPk(id)
            // console.log(slcProduct);
            if (!slcArticle) throw { name: "Article Not Found" }

            if (slcArticle.authorId !== user.id) throw { name: "Forbidden" }
        }

        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function adminAuthorization(req, res, next) {
    try {
        if (req.loginInfo.role === "Admin") {
            next()
        } else {
            throw { name: "Forbidden" }
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {articleAuthorization, adminAuthorization}