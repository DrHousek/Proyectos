import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Configuración de la aplicación
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuración de JWT
export const JWT_SECRET = process.env.JWT_SECRET || 'secreto_por_defecto_cambiar_en_produccion';
export const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secreto_por_defecto_cambiar_en_produccion';
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Configuración de CORS
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Configuración de cookies
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
};

// Validar variables de entorno requeridas
const requiredEnvVars = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ Variable de entorno requerida no definida: ${envVar}`);
    process.exit(1);
  }
});
