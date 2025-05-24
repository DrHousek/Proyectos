import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

// Cargar variables de entorno
dotenv.config();
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error(chalk.red('✗ No se encontró .env'));
  process.exit(1);
}

// Obtener configuración según el tipo de base de datos
const dbType = process.env.DB_TYPE || 'mysql';

// Configuración por defecto para MySQL
let dbName = process.env.DB_MYSQL_NAME || 'el_osito_feliz';
let dbUser = process.env.DB_MYSQL_USER || 'root';
let dbHost = process.env.DB_MYSQL_HOST || 'localhost';
let dbPort = Number(process.env.DB_MYSQL_PORT || 3306);
let dbPassword = process.env.DB_MYSQL_PASSWORD || '';

// Configuración específica por tipo de base de datos
if (dbType === 'postgres') {
  dbName = process.env.DB_PG_NAME || dbName;
  dbUser = process.env.DB_PG_USER || dbUser;
  dbHost = process.env.DB_PG_HOST || dbHost;
  dbPort = Number(process.env.DB_PG_PORT || dbPort);
  dbPassword = process.env.DB_PG_PASSWORD || dbPassword;
} else if (dbType === 'mssql') {
  dbName = process.env.DB_MSSQL_NAME || dbName;
  dbUser = process.env.DB_MSSQL_USER || dbUser;
  dbHost = process.env.DB_MSSQL_HOST || dbHost;
  dbPort = Number(process.env.DB_MSSQL_PORT || dbPort);
  dbPassword = process.env.DB_MSSQL_PASSWORD || dbPassword;
} else if (dbType === 'oracle') {
  dbName = process.env.DB_ORACLE_NAME || dbName;
  dbUser = process.env.DB_ORACLE_USER || dbUser;
  dbHost = process.env.DB_ORACLE_HOST || dbHost;
  dbPort = Number(process.env.DB_ORACLE_PORT || dbPort);
  dbPassword = process.env.DB_ORACLE_PASSWORD || dbPassword;
}

// Configuración de Sequelize
const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: dbType as any,
    logging: false,
    dialectOptions: {
      ssl: false,
    },
    ...(dbType === 'mysql' && {
      dialectOptions: {
        connectTimeout: 60000,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
  }
);

// Conectar a la base de datos
export const connectDB = async () => {
  try {
    console.log(chalk.blue(`⚡ Conectando a ${dbType.toUpperCase()}...`));
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(chalk.green(`✓ ${dbType.toUpperCase()}: ${dbName}@${dbHost}:${dbPort}`));
  } catch (error: any) {
    console.error(chalk.red('✗ Error de conexión'));
    console.error(chalk.dim(error.parent?.message || error.message));
    process.exit(1);
  }
};

export { sequelize };