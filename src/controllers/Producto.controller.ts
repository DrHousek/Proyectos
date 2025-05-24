// src/controllers/Producto.controller.ts
import { Request, Response, NextFunction } from 'express';
import { Producto } from '../models/Producto.model';

export async function crearProducto(req: Request, res: Response, next: NextFunction) {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
}

export async function obtenerProductos(_req: Request, res: Response, next: NextFunction) {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    next(error);
  }
}

export async function obtenerProductoPorId(req: Request, res: Response, next: NextFunction) {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    next(error);
  }
}

export async function actualizarProducto(req: Request, res: Response, next: NextFunction) {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    next(error);
  }
}

export async function eliminarProducto(req: Request, res: Response, next: NextFunction) {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}
