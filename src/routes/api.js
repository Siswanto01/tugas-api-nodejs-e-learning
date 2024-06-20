const express = require('express');
const authMiddleware = require('../middleware/auth-middleware.js');
const kelasController = require('../controllers/kelas-controller.js');

const userRouter = new express.Router();
userRouter.use(authMiddleware);

userRouter.get('/api/kelas', kelasController.getListKelasWithMetodePembelajaran);
userRouter.get('/api/mata-pelajaran', kelasController.getListMataPelajaran);
userRouter.get('/api/bab', kelasController.getBabWithMataPelajaran);
userRouter.get('/api/sub-bab', kelasController.getListSubBab);
userRouter.get('/api/materi', kelasController.getListMateri);

module.exports = userRouter;