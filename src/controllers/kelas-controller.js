const kelasService = require('../service/kelas-service');

const getListKelasWithMetodePembelajaran = async (req, res, next) => {
    try {
        const user = req.user
        const result = await kelasService.getListKelasWithMetodePembelajaran(user);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getListMataPelajaran = async (req, res, next) => {
    try {
        const user = req.user
        const { id_kelas, id_mode_pembelajaran } = req.query;
        const result = await kelasService.getListMataPelajaran(id_kelas, id_mode_pembelajaran, user);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
}

const getBabWithMataPelajaran = async (req, res, next) => {
    try {
        const user = req.user
        const { id_mata_pelajaran } = req.query;
        const result = await kelasService.getBabWithMataPelajaran(id_mata_pelajaran, user);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
}

const getListSubBab = async (req, res, next) => {
    try {
        const user = req.user
        const { id_bab } = req.query;
        const result = await kelasService.getListSubBab(id_bab, user);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
}

const getListMateri = async (req, res, next) => {
    try {
        const user = req.user
        const { id_sub_bab } = req.query;
        const result = await kelasService.getListMateri(id_sub_bab, user);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getListKelasWithMetodePembelajaran,
    getListMataPelajaran,
    getBabWithMataPelajaran,
    getListSubBab,
    getListMateri
}
