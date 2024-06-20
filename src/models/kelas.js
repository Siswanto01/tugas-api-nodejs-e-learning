'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class kelas extends Model {
        static associate(models) {
            kelas.hasMany(models.mode_pembelajaran, {
                foreignKey: 'id_kelas',
                as: 'mode_pembelajaran'
            });
            kelas.hasMany(models.mata_pelajaran, {
                foreignKey: 'id_kelas',
                as: 'mata_pelajaran'
            });
        }
    }
    kelas.init({
        id_kelas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama_kelas: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'kelas',
        tableName: 'kelas',
        underscored: true,
        timestamps: false
    });
    return kelas;
};