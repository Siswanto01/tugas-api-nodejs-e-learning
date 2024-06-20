'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sub_bab', {
      id_sub_bab: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_sub_bab: {
        type: Sequelize.STRING,
        allowNull: false
      },
      thumbnail_sub_bab: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_free: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      id_bab: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bab',
          key: 'id_bab'
        }
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
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sub_bab');
  }
};
