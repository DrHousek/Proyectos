// src/index.ts
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/errorHandler';
import { sequelize } from './config/database';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

// Importar asociaciones antes del connectDB
import './models/associations';

// Rutas
import clienteRoutes from './routes/Cliente.routes';
import productoRoutes from './routes/Producto.routes';
import proveedorRoutes from './routes/Proveedor.routes';
import ventaRoutes from './routes/Venta.routes';
import authRoutes from './routes/auth.routes';
import roleRoutes from './routes/role.routes';
import resourceRoutes from './routes/resource.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ 
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'], 
  credentials: true 
})); 
app.use(express.json());

// Rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Manejador de errores
app.use(errorHandler);

// Función para mostrar el banner de inicio
const showStartupBanner = async () => {
  const models = Object.keys(sequelize.models);
  
  console.clear(); // Limpia la consola
  console.log(chalk.cyan.bold('\n=== EL OSITO FELIZ API ===\n'));
  
  // Información de la base de datos
  console.log(chalk.yellow('📦 Base de Datos:'));
  console.log(chalk.blue(`  ⚡ Tipo: ${process.env.DB_TYPE?.toUpperCase() || 'MYSQL'}`));
  console.log(chalk.blue(`  📁 Nombre: ${process.env.DB_MYSQL_NAME}`));
  console.log(chalk.blue(`  🔌 Host: ${process.env.DB_MYSQL_HOST}:${process.env.DB_MYSQL_PORT}\n`));
  
  // Modelos/Tablas
  console.log(chalk.yellow('📋 Modelos Cargados:'));
  models.forEach(model => {
    console.log(chalk.green(`  ✓ ${model}`));
  });
  
  // URLs
  console.log(chalk.yellow('\n🌐 Endpoints:'));
  console.log(chalk.magenta(`  🚀 API: http://localhost:${PORT}`));
  console.log(chalk.magenta(`  📚 Docs: http://localhost:${PORT}/api-docs\n`));
};

// Iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      showStartupBanner();
    });
  } catch (error) {
    console.error(chalk.red('✗ Error al iniciar el servidor:', error));
    process.exit(1);
  }
};

startServer();
