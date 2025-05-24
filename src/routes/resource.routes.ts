import { Router } from 'express';
import {
  crearResource,
  obtenerResources,
  obtenerResourcePorId,
  actualizarResource,
  eliminarResource
} from '../controllers/resource.controller';

const router = Router();

router.post('/', crearResource);
router.get('/', obtenerResources);
router.get('/:id', obtenerResourcePorId);
router.put('/:id', actualizarResource);
router.delete('/:id', eliminarResource);

export default router;