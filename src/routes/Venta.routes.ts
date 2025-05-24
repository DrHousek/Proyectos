import { Router } from 'express';
import {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  actualizarVenta,
  eliminarVenta
} from '../controllers/Venta.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Operaciones con ventas
 */

router.post('/', crearVenta);
/**
 * @swagger
 * /api/ventas:
 *   post:
 *     summary: Crear venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       201:
 *         description: Venta creada correctamente
 */

router.get('/', obtenerVentas);
/**
 * @swagger
 * /api/ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 */

router.get('/:id', obtenerVentaPorId);
/**
 * @swagger
 * /api/ventas/{id}:
 *   get:
 *     summary: Obtener venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 */

router.put('/:id', actualizarVenta);
/**
 * @swagger
 * /api/ventas/{id}:
 *   put:
 *     summary: Actualizar venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       200:
 *         description: Venta actualizada correctamente
 *       404:
 *         description: Venta no encontrada
 */

router.delete('/:id', eliminarVenta);
/**
 * @swagger
 * /api/ventas/{id}:
 *   delete:
 *     summary: Eliminar venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta eliminada correctamente
 *       404:
 *         description: Venta no encontrada
 */

export default router;
