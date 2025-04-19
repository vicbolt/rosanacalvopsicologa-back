'use strict'

import express from 'express';
import { saveMsg, getMsg } from '../controllers/mensaje.js';

const router = express.Router();

//RUTAS DE VERDAD
router.post('/saveMsg', saveMsg);
router.get('/getMsg', getMsg);

export default router;