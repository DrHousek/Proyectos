// src/controllers/Cliente.controller.ts
import { Request, Response, NextFunction } from 'express';
import { Cliente } from '../models/Cliente.model';

// Crear cliente
export async function crearCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json(nuevoCliente); // Envía la respuesta
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
}

// Crear lote de clientes
export async function crearClientesLote(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const clientes: Array<{ [key: string]: any }> = req.body;

    if (!Array.isArray(clientes)) {
      res.status(400).json({ error: 'Se esperaba un arreglo de clientes' });
      return; // Termina la ejecución aquí
    }

    const nuevosClientes = await Cliente.bulkCreate(clientes);
    res.status(201).json({ mensaje: 'Clientes creados correctamente', data: nuevosClientes });
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
}

// Obtener todos los clientes
export async function obtenerClientes(_: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes); // Envía la lista de clientes
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
}

// Obtener cliente por ID
export async function obtenerClientePorId(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente); // Envía el cliente si existe
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
}

// Actualizar cliente
export async function actualizarCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      res.status(404).json({ error: 'Cliente no encontrado' });
      return; // Termina la ejecución aquí
    }
    await cliente.update(req.body); // Actualiza los datos del cliente
    res.json(cliente); // Envía el cliente actualizado
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
}

// Eliminar cliente
export async function eliminarCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      res.status(404).json({ error: 'Cliente no encontrado' });
      return; // Termina la ejecución aquí
    }
    await cliente.destroy(); // Elimina el cliente
    res.json({ mensaje: 'Cliente eliminado correctamente' }); // Confirma la eliminación
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
}