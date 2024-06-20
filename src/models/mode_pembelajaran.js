'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class mode_pembelajaran extends Model {
        static associate(models) {
            mode_pembelajaran.belongsTo(models.kelas, {
                foreignKey: 'id_kelas',
                as: 'kelas'
            });
            mode_pembelajaran.hasMany(models.mata_pelajaran, { foreignKey: 'id_mode_membelajaran', as: 'mata_pelajaran' });
        }
    }
    mode_pembelajaran.init({
        id_mode_pembelajaran: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama_mode_pembelajaran: DataTypes.STRING,
        deskripsi_mode_pembelajaran: DataTypes.TEXT,
        id_kelas: {
            type: DataTypes.INTEGER,
            references: {
                model: 'kelas',
                key: 'id_kelas'
            }
        }
    }, {
        sequelize,
        modelName: 'mode_pembelajaran',
        tableName: 'mode_pembelajaran',
        underscored: true,
        timestamps: false
    });
    return mode_pembelajaran;
};