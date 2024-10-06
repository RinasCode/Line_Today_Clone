'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, { foreignKey: "authorId" })
      Article.belongsTo(models.Category, { foreignKey: "categoryId" })
    }
  }
  Article.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Title is required"
        },
        notNull : {
          msg : "Title is required"
        }
      }
    },

    content: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Content is Required"
        },
        notNull : {
          msg : "Content is Required"
        }
      }
    },

    imgUrl:{ 
      type : DataTypes.STRING,
      allowNull : false,
    },

    categoryId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "CategoryId is Required"
        },
        notNull : {
          msg : "CategoryId is Required"
        }
      }
    },

    authorId: { 
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "AuthorId is Required"
        },
        notNull : {
          msg : "AuthorId is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};