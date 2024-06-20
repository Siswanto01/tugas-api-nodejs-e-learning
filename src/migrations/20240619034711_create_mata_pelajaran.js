'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mata_pelajaran', {
      id_mata_pelajaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_mata_pelajaran: {
        type: Sequelize.STRING,
        allowNull: false
      },
      thumbnail_mata_pelajaran: {
        type: Sequelize.STRING,
        allowNull: true
      },
      id_mode_pembelajaran: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mode_pembelajaran',
          key: 'id_mode_pembelajaran'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'kelas',
          key: 'id_kelas'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('mata_pelajaran');
  }
};
