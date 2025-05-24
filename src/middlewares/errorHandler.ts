// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  console.log(chalk.red.bold('\n💥 Error capturado por middleware 💥'));
  console.log(chalk.yellowBright(`📌 Mensaje: ${message}`));
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    console.log(chalk.gray(`🧩 Stack:\n${err.stack || 'Sin stack'}`));
  }

  res.status(status).json({
    ok: false,
    error: message,
  });
}
