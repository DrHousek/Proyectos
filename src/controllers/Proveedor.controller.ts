import { Request, Response, NextFunction } from 'express';
import { Proveedor } from '../models/Proveedor.model';

export async function crearProveedor(req: Request, res: Response, next: NextFunction) {
  try {
    const proveedor = await Proveedor.create(req.body);
    res.status(201).json(proveedor);
  } catch (error) {
    next(error);
  }
}

export async function obtenerProveedores(_req: Request, res: Response, next: NextFunction) {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);
  } catch (error) {
    next(error);
  }
}

export async function obtenerProveedorPorId(req: Request, res: Response, next: NextFunction) {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    next(error);
  }
}

export async function actualizarProveedor(req: Request, res: Response, next: NextFunction) {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      res.status(404).json({ error: 'Proveedor no encontrado' });
      return;
    }
    await proveedor.update(req.body);
    res.json(proveedor);
  } catch (error) {
    next(error);
  }
}

export async function eliminarProveedor(req: Request, res: Response, next: NextFunction) {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      res.status(404).json({ error: 'Proveedor no encontrado' });
      return;
    }
    await proveedor.destroy();
    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}
