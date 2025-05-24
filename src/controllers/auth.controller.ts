import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.model';

// Configuración
import { 
  JWT_SECRET, 
  JWT_REFRESH_SECRET, 
  COOKIE_OPTIONS
} from '../config/config';

// Generar tokens
const generarTokens = (id: number) => {
  if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('Las variables de entorno para JWT no están configuradas correctamente');
  }

  const accessToken = jwt.sign(
    { id },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Interfaces
declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
      };
    }
  }
}

interface AuthRequest extends Request {
  usuario?: {
    id: number;
  };
}

interface RegistroBody {
  email: string;
  password: string;
  username: string;
}

export const registrar = async (req: Request<{}, {}, RegistroBody>, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;

    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const usuario = await User.create({
      email,
      password,
      username,
      is_active: true
    });

    const { accessToken, refreshToken } = generarTokens(usuario.id);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    res.status(201).json({
      accessToken,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        is_active: usuario.is_active
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    next(error);
  }
};

interface LoginBody {
  email: string;
  password: string;
}

export const login = async (req: Request<{}, {}, LoginBody>, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    console.log('Intentando iniciar sesión con email:', email);
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    console.log('Usuario encontrado:', usuario ? usuario.id : 'No encontrado');
    const esContraseñaValida = await usuario.comparePassword(password);
    if (!esContraseñaValida) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    console.log('Contraseña válida:', esContraseñaValida);
    const { accessToken, refreshToken } = generarTokens(usuario.id);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    res.json({
      accessToken,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        is_active: usuario.is_active
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    next(error);
  }
};

export const obtenerUsuarioAutenticado = async (req: AuthRequest, res: Response, _next: NextFunction): Promise<Response | void> => {
  try {
    if (!req.usuario?.id) {
      return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    const usuario = await User.findByPk(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      is_active: usuario.is_active
    });
  } catch (error) {
    console.error('Error al obtener usuario autenticado:', error);
    return _next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, _next: NextFunction): Promise<Response | void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ msg: 'No se proporcionó un refresh token' });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET!) as { id: number };
    
    const usuario = await User.findByPk(decoded.id);

    if (!usuario) {
      return res.status(403).json({ msg: 'Refresh token inválido o expirado' });
    }

    const tokens = generarTokens(usuario.id);

    res.cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS);

    res.json({ accessToken: tokens.accessToken });
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    res.status(403).json({ msg: 'Token de refresco inválido' });
  }
};

export const logout = async (_req: AuthRequest, res: Response, _next: NextFunction): Promise<Response | void> => {
  try {
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    res.json({ msg: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    _next(error);
  }
};
