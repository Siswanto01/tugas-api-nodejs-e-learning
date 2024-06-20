'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class mata_pelajaran extends Model {
    static associate(models) {
      // define association here
      mata_pelajaran.belongsTo(models.mode_pembelajaran, {
        foreignKey: 'id_mode_pembelajaran',
        as: 'mode_pembelajaran'
      });

      mata_pelajaran.belongsTo(models.kelas, {
        foreignKey: 'id_kelas',
        as: 'kelas'
      });

      mata_pelajaran.hasMany(models.bab, {
        foreignKey: 'id_mata_pelajaran',
        as: 'bab'
      });
    }
  }
  mata_pelajaran.init({
    id_mata_pelajaran: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_mata_pelajaran: DataTypes.STRING,
    thumbnail_mata_pelajaran: DataTypes.STRING,
    id_mode_pembelajaran: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mode_pembelajaran',
        key: 'id_mode_pembelajaran'
      }
    },
    id_kelas: {
      type: DataTypes.INTEGER,
      references: {
        model: 'kelas',
        key: 'id_kelas'
      }
    }
  }, {
    sequelize,
    modelName: 'mata_pelajaran',
    tableName: 'mata_pelajaran',
    timestamps: false
  });
  return mata_pelajaran;
};
