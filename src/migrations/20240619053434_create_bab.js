'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bab', {
      id_bab: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_bab: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_mata_pelajaran: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mata_pelajaran',
          key: 'id_mata_pelajaran'
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
    await queryInterface.dropTable('bab');
  }
};