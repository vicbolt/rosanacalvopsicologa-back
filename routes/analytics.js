// routes/analytics.routes.js
import express from 'express';
import { obtenerUsuariosActivos } from '../controllers/analytics.js';

const router = express.Router();

router.get('/usuarios', obtenerUsuariosActivos);

export default router;
