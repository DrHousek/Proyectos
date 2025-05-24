import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Proveedor = sequelize.define('Proveedor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigoProveedor: {
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
  provincia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (proveedor: any) => {
      const ultimo = await Proveedor.findOne({
        order: [['id', 'DESC']]
      });

      const ultimoCodigo = ultimo?.getDataValue('codigoProveedor') || 'PV000';
      const numero = parseInt(ultimoCodigo.replace('PV', ''), 10) + 1;

      proveedor.codigoProveedor = `PV${numero.toString().padStart(3, '0')}`;
    }
  }
});
