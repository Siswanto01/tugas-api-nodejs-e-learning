'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mode_pembelajaran', {
      id_mode_pembelajaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_mode_pembelajaran: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deskripsi_mode_pembelajaran: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'kelas',
          key: 'id_kelas'
        },
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mode_pembelajaran');
  }
};