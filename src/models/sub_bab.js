'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_bab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_bab.belongsTo(models.bab, {
        foreignKey: 'id_bab',
        as: 'bab'
      }),
      sub_bab.hasMany(models.materi, {
        foreignKey: 'id_sub_bab',
        as: 'materi'
      })
    }
  }
  sub_bab.init({
    id_sub_bab : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    nama_sub_bab: DataTypes.STRING,
    thumbnail_sub_bab: DataTypes.STRING,
    is_free: DataTypes.BOOLEAN,
    id_bab: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bab',
        key: 'id_bab'
      }
    }
  }, {
    sequelize,
    modelName: 'sub_bab',
    tableName: 'sub_bab',
    timestamps: false
  });
  return sub_bab;
};