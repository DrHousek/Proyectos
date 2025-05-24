import { Router } from 'express';
import {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor
} from '../controllers/Proveedor.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Gestión de proveedores
 */

router.post('/', crearProveedor);
/**
 * @swagger
 * /api/proveedores:
 *   post:
 *     summary: Crear un proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       201:
 *         description: Proveedor creado correctamente
 */

router.get('/', obtenerProveedores);
/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 */

router.get('/:id', obtenerProveedorPorId);
/**
 * @swagger
 * /api/proveedores/{id}:
 *   get:
 *     summary: Obtener proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 */

router.put('/:id', actualizarProveedor);
/**
 * @swagger
 * /api/proveedores/{id}:
 *   put:
 *     summary: Actualizar proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       200:
 *         description: Proveedor actualizado correctamente
 *       404:
 *         description: Proveedor no encontrado
 */

router.delete('/:id', eliminarProveedor);
/**
 * @swagger
 * /api/proveedores/{id}:
 *   delete:
 *     summary: Eliminar proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado correctamente
 *       404:
 *         description: Proveedor no encontrado
 */

export default router;
