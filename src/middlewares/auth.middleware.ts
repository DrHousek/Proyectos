import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

// Extender la interfaz Request para incluir la propiedad usuario
declare global {
  namespace Express {
    interface Request {
      user?: {  // Cambiar de 'usuario' a 'user'
        id: number;
        rol: string;
      };
    }
  }
}

interface JwtPayload {
  id: number;
  rol: string; // Asegúrate de que esta propiedad esté definida
  iat: number;
  exp: number;
}

// Extraer token del header o de las cookies
const extractToken = (req: Request): string | null => {
  // 1. Intentar obtener el token del header de autorización
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  // 2. Intentar obtener el token de las cookies
  if (req.cookies?.refreshToken) {
    return req.cookies.refreshToken;
  }

  // 3. Intentar obtener el token del header x-auth-token (para compatibilidad con versiones anteriores)
  const xAuthToken = req.header('x-auth-token');
  if (xAuthToken) {
    return xAuthToken;
  }

  return null;
};

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Obtener el token
    const token = extractToken(req);

    // Verificar si no hay token
    if (!token) {
      res.status(401).json({ 
        success: false,
        message: 'Acceso denegado. No se proporcionó token de autenticación.'
      });
      return;
    }

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Agregar usuario al request
    req.user = {
      id: decoded.id,
      rol: decoded.rol
    };
    
    next();
  } catch (error) {
    console.error('Error en autenticación:', error);
    
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ 
        success: false,
        message: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
        expired: true
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ 
        success: false,
        message: 'Token inválido. Por favor, inicia sesión nuevamente.'
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: 'Error en el servidor durante la autenticación.'
      });
    }
  }
};

// Middleware para verificar rol de administrador
export const esAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Acceso denegado. Se requieren privilegios de administrador' });
  }
};
