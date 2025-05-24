import { Request, Response, NextFunction } from 'express';
import Role from '../models/Role.model';
import User from '../models/User.model';

export async function crearRole(req: Request, res: Response, next: NextFunction) {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
}

export async function obtenerRoles(_req: Request, res: Response, next: NextFunction) {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

export async function obtenerRolePorId(req: Request, res: Response, next: NextFunction) {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    next(error);
  }
}

export async function actualizarRole(req: Request, res: Response, next: NextFunction) {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }
    await role.update(req.body);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

export async function eliminarRole(req: Request, res: Response, next: NextFunction) {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }
    await role.destroy();
    res.json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}

function asignarUsuarioARol(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { roleId } = req.params;
      const { userId } = req.body;

      const role = await Role.findByPk(roleId);
      const user = await User.findByPk(userId);

      if (!role || !user) {
        return res.status(404).json({ error: 'Rol o usuario no encontrado' });
      }

      await user.addRole(role); // Esto crea la relación en role_users

      res.json({ mensaje: 'Rol asignado al usuario correctamente' });
    } catch (error) {
      next(error);
    }
  })();
}

export { asignarUsuarioARol };