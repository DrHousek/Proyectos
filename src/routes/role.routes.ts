import { Router } from 'express';
import {
  crearRole,
  obtenerRoles,
  obtenerRolePorId,
  actualizarRole,
  eliminarRole,
  asignarUsuarioARol
} from '../controllers/role.controller';
import { auth, esAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Permitir la creación inicial de roles sin autenticación
router.post('/', crearRole);
router.get('/', obtenerRoles);
router.get('/:id', auth, obtenerRolePorId);
router.put('/:id', [auth, esAdmin], actualizarRole);
router.delete('/:id', [auth, esAdmin], eliminarRole);
router.post('/:roleId/users', asignarUsuarioARol);

export default router;