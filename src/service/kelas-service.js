const ResponseError = require('../error/response-error');
const models = require('../models');

const getListKelasWithMetodePembelajaran = async (user) => {
    try {
        const result = await models.kelas.findAll({
            include: [{
                model: models.mode_pembelajaran,
                as: 'mode_pembelajaran'
            }]
        });
        return result;
    } catch (error) {
        console.error('Error in getListKelasWithMetodePembelajaran:', error);
        throw error;
    }
};

const getListMataPelajaran = async (id_kelas, id_mode_pembelajaran) => {
    const modePembelajaran = await models.mode_pembelajaran.findByPk(id_mode_pembelajaran);
    const kelasData = await models.kelas.findByPk(id_kelas);

    if (!modePembelajaran || !kelasData) {
        throw new ResponseError(400, 'Mode pembelajaran atau kelas tidak ditemukan.');
    }

    const mataPelajaranList = await models.mata_pelajaran.findAll({
        where: {
            id_mode_pembelajaran: id_mode_pembelajaran
        },
        include: [{
            model: models.kelas,
            as: 'kelas',
            where: {
                id_kelas: id_kelas
            }
        },
    ]
    });

    return mataPelajaranList;
}

const getBabWithMataPelajaran = async (id_mata_pelajaran, user) => {
    const userProgres = await models.progres.findOne({
        where: {
            id_user: user.id_user,
        },
        attributes: ['status_progres']
    });
    const bab = await models.bab.findOne({
        include: [{
            model: models.mata_pelajaran,
            as: 'mata_pelajaran',
            where: {
                id_mata_pelajaran: id_mata_pelajaran
            }
        },
        {
            model: models.sub_bab,
            as: 'sub_bab',
            attributes: ['is_free']
        }
    ]
    });

    return {
        userProgres,
        bab
    };
}

const getListSubBab = async (id_bab, user) => {
    const userProgres = await models.progres.findOne({
        where: {
            id_user: user.id_user,
        },
        attributes: ['status_progres']
    })

    const result = await models.sub_bab.findAll({
        where: {
            id_bab: id_bab
        }
    })

    return {
        userProgres,
        result
    }
}

const getListMateri = async (id_sub_bab, user) => {
    try {
        const materiList = await models.materi.findAll({
            where: {
                id_sub_bab: id_sub_bab
            }
        });

        if (materiList.length === 0) {
            return [];
        }

        const materiIds = materiList.map(materi => materi.id_materi);

        const userProgressList = await models.progres.findAll({
            where: {
                id_user: user.id_user,
                id_materi: materiIds,
            }
        });

        const progressMap = userProgressList.reduce((map, progress) => {
            map[progress.id_materi] = progress;
            return map;
        }, {});

        const formattedMateriList = materiList.map(materi => {
            const progress = progressMap[materi.id_materi] || {};
            return {
                id_materi: materi.id_materi,
                nama_materi: materi.nama_materi,
                thumbnail_materi: materi.thumbnail_materi,
                tipe_materi: materi.tipe_materi,
                XP: materi.XP,
                Gold: materi.Gold,
                is_completed: materi.is_completed,
                status_progres: progress.status_progres || false,
                progress: progress
            };
        });
        return formattedMateriList;
    } catch (error) {
        console.error('Error fetching list materi:', error);
        throw error;
    }
};






module.exports = {
    getListKelasWithMetodePembelajaran,
    getListMataPelajaran,
    getBabWithMataPelajaran,
    getListSubBab,
    getListMateri
};
