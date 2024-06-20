'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bab.belongsTo(models.mata_pelajaran, {
        foreignKey: 'id_mata_pelajaran',
        as: 'mata_pelajaran'
      });
      bab.hasMany(models.sub_bab, {
        foreignKey: 'id_bab',
        as: 'sub_bab'
      })
    }
  }
  bab.init({
    id_bab: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_bab: DataTypes.STRING,
    thumbnail_bab: DataTypes.STRING,
    id_mata_pelajaran: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mata_pelajaran',
        key: 'id_mata_pelajaran'
      }
    }
  }, {
    sequelize,
    modelName: 'bab',
    tableName: 'bab',
    timestamps: false
  });
  return bab;
};