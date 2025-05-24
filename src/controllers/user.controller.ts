import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';

export async function obtenerUsuarios(_req: Request, res: Response, next: NextFunction) {
  try {
    const usuarios = await User.findAll({
      attributes: { exclude: ['password', 'refreshToken', 'refreshTokenExpires'] }
    });
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
}

export async function obtenerUsuarioPorId(req: Request, res: Response, next: NextFunction) {
  try {
    const usuario = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'refreshToken', 'refreshTokenExpires'] }
    });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
}

export async function actualizarUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    
    const { password, ...datosActualizacion } = req.body;
    await usuario.update(datosActualizacion);
    
    const usuarioActualizado = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'refreshToken', 'refreshTokenExpires'] }
    });
    res.json(usuarioActualizado);
  } catch (error) {
    next(error);
  }
}

export async function eliminarUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}