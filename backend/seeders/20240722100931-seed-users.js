'use strict';
const {hash} = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const user = require ('../data/User.json').map((e) =>{
      delete e.id
      e.password=hash(e.password)
      e.createdAt = e.updatedAt = new Date ()
      return e
      })
      await queryInterface.bulkInsert("Users", user, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
