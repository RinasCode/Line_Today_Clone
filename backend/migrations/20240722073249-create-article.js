'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull : false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull : false
      },
      imgUrl: {
        type: Sequelize.STRING,
        allowNull : false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Categories",
          key : "id"
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'

      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Users",
          key : "id"
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  }
};