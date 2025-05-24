import { Request, Response, NextFunction } from 'express';
import Resource from '../models/Resource.model';

export async function crearResource(req: Request, res: Response, next: NextFunction) {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
}

export async function obtenerResources(_req: Request, res: Response, next: NextFunction) {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    next(error);
  }
}

export async function obtenerResourcePorId(req: Request, res: Response, next: NextFunction) {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ error: 'Recurso no encontrado' });
    }
  } catch (error) {
    next(error);
  }
}

export async function actualizarResource(req: Request, res: Response, next: NextFunction) {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      res.status(404).json({ error: 'Recurso no encontrado' });
      return;
    }
    await resource.update(req.body);
    res.json(resource);
  } catch (error) {
    next(error);
  }
}

export async function eliminarResource(req: Request, res: Response, next: NextFunction) {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      res.status(404).json({ error: 'Recurso no encontrado' });
      return;
    }
    await resource.destroy();
    res.json({ mensaje: 'Recurso eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}