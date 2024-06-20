'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class materi extends Model {
    static associate(models) {
      // Define associations here
     materi.belongsTo(models.sub_bab, {
        foreignKey: 'id_sub_bab',
        as: 'sub_bab'
      }),
      materi.hasMany(models.progres, {
        foreignKey: 'id_materi',
        as: 'progres'
      })
    }
  }
  
 materi.init({
    id_materi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_materi: DataTypes.STRING,
    thumbnail_materi: DataTypes.STRING,
    tipe_materi: {
      type: DataTypes.ENUM('Video', 'End Quiz', 'Single Quiz', 'Summary'),
      allowNull: false
    },
    XP: DataTypes.INTEGER,
    Gold: DataTypes.INTEGER,
    is_completed: DataTypes.BOOLEAN,
    id_sub_bab: DataTypes.INTEGER
  }, {
    sequelize,
    modelName:  'materi',
    tableName:  'materi',
    timestamps: false
  });

  return materi;
};
