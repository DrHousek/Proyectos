import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Venta = sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigoVenta: {
    type: DataTypes.STRING,
    unique: true,
  },
  fecha_venta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descuento: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  valor_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (venta: any) => {
      const ultimo = await Venta.findOne({
        order: [['id', 'DESC']]
      });

      const ultimoCodigo = ultimo?.getDataValue('codigoVenta') || 'VE000';
      const numero = parseInt(ultimoCodigo.replace('VE', ''), 10) + 1;

      venta.codigoVenta = `VE${numero.toString().padStart(3, '0')}`;
    }
  }
});
