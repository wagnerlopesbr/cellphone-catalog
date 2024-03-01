"use strict";

/** @type {import('sequelize-cli').Migration} */

const users = require("../models/users");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "user1",
        email: "user1@email.com",
        password: "password1",
      },
      {
        name: "user2",
        email: "user2@email.com",
        password: "password2",
      },
      {
        name: "user3",
        email: "user3@email.com",
        password: "password3",
      },
      {
        name: "user4",
        email: "user4@email.com",
        password: "password4",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};