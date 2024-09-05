'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name:{
        type:Sequelize.STRING
      },
      last_name:{
        type:Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
      },
      phone: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles', // Name of the table that this column references
          key: 'id' // Key in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      password: {
        type: Sequelize.STRING
      },
      address:{
        type:Sequelize.TEXT,
        allowNull:true
      },
      branch_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Branches', // Name of the table that this column references
          key: 'id' // Key in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

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
    await queryInterface.dropTable('Users');
  }
};