import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigoProducto: {
    type: DataTypes.STRING,
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  existencias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (producto: any) => {
      const ultimo = await Producto.findOne({
        order: [['id', 'DESC']]
      });

      const ultimoCodigo = ultimo?.getDataValue('codigoProducto') || 'PR000';
      const numero = parseInt(ultimoCodigo.replace('PR', ''), 10) + 1;

      producto.codigoProducto = `PR${numero.toString().padStart(3, '0')}`;
    }
  }
});
