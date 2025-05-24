import { Request, Response, NextFunction } from 'express';
import { Venta } from '../models/Venta.model';

export async function crearVenta(req: Request, res: Response, next: NextFunction) {
  try {
    const venta = await Venta.create(req.body);
    res.status(201).json(venta);
  } catch (error) {
    next(error);
  }
}

export async function obtenerVentas(_req: Request, res: Response, next: NextFunction) {
  try {
    const ventas = await Venta.findAll();
    res.json(ventas);
  } catch (error) {
    next(error);
  }
}

export async function obtenerVentaPorId(req: Request, res: Response, next: NextFunction) {
  try {
    const venta = await Venta.findByPk(req.params.id);
    if (venta) {
      res.json(venta);
    } else {
      res.status(404).json({ error: 'Venta no encontrada' });
    }
  } catch (error) {
    next(error);
  }
}

export async function actualizarVenta(req: Request, res: Response, next: NextFunction) {
  try {
    const venta = await Venta.findByPk(req.params.id);
    if (!venta) {
      res.status(404).json({ error: 'Venta no encontrada' });
      return;
    }
    await venta.update(req.body);
    res.json(venta);
  } catch (error) {
    next(error);
  }
}

export async function eliminarVenta(req: Request, res: Response, next: NextFunction) {
  try {
    const venta = await Venta.findByPk(req.params.id);
    if (!venta) {
      res.status(404).json({ error: 'Venta no encontrada' });
      return;
    }
    await venta.destroy();
    res.json({ mensaje: 'Venta eliminada correctamente' });
  } catch (error) {
    next(error);
  }
}
