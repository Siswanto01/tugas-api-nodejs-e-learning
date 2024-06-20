'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class progres extends Model {
    static associate(models) {
      progres.belongsTo(models.user, {
        foreignKey: 'id_user',
        as: 'user'
      });
      progres.belongsTo(models.materi, {
        foreignKey: 'id_materi',
        as: 'materi'
      });
    }
  }
  progres.init({
    id_progres: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_materi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_progres: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'progres',
    tableName: 'progres',
    timestamps: false
  });
  return progres;
};
