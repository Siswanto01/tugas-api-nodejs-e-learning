'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('materi', {
      id_materi: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama_materi: {
        type: Sequelize.STRING
      },
      thumbnail_materi: {
        type: Sequelize.STRING
      },
      tipe_materi: {
        type: Sequelize.STRING
      },
      XP: {
        type: Sequelize.INTEGER
      },
      Gold: {
        type: Sequelize.INTEGER
      },
      is_completed: {
        type: Sequelize.BOOLEAN
      },
      id_sub_bab: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sub_bab',
          key: 'id_sub_bab'
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
    await queryInterface.dropTable('materi');
  }
};