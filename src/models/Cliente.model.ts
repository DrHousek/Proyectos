// src/models/Cliente.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigoCliente: {
    type: DataTypes.STRING,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (cliente: any) => {
      // Para creación individual
      const ultimo = await Cliente.findOne({
        order: [['createdAt', 'DESC']]
      });

      let nuevoCodigo = 'CL001';
      if (ultimo && ultimo.codigoCliente) {
        const numero = parseInt(ultimo.codigoCliente.slice(2)) + 1;
        nuevoCodigo = `CL${numero.toString().padStart(3, '0')}`;
      }

      cliente.codigoCliente = nuevoCodigo;
    },

    beforeBulkCreate: async (clientes: any[]) => {
      // Para creación en lote
      const ultimo = await Cliente.findOne({
        order: [['createdAt', 'DESC']]
      });

      let numeroBase = 0;
      if (ultimo && ultimo.codigoCliente) {
        numeroBase = parseInt(ultimo.codigoCliente.slice(2));
      }

      let contador = 1;
      for (const cliente of clientes) {
        const nuevoNumero = numeroBase + contador;
        cliente.codigoCliente = `CL${nuevoNumero.toString().padStart(3, '0')}`;
        contador++;
      }
    }
  }
});
