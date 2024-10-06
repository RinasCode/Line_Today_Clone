'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = require ('../data/Category.json').map((e) =>{
      delete e.id
      e.createdAt = e.updatedAt = new Date ()
      return e
      })
      await queryInterface.bulkInsert("Categories", categories, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {})
  }
};
