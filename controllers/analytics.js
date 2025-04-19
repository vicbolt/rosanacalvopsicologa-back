// controllers/analytics.controller.js
import { getTotalUsers } from '../services/analytics.js';

export async function obtenerUsuariosActivos(req, res) {
  try {
    const total = await getTotalUsers();
    res.status(200).json({ total });
  } catch (err) {
    console.error('Error al obtener usuarios activos:', err);
    res.status(500).json({ error: err.message });
  }
}
