// src/models/associations.ts
import { Cliente } from './Cliente.model';
import { Producto } from './Producto.model';
import { Proveedor } from './Proveedor.model';
import { Venta } from './Venta.model';
import { DataTypes } from 'sequelize';
// User is imported later in the file
// Role is already imported later in the file
import Resource from './Resource.model';
import RefreshToken from './RefreshToken.model';
import { sequelize } from '../config/database';

// 🔁 Muchos a Muchos: Venta <-> Producto (con tabla intermedia)
export const VentaProducto = sequelize.define('VentaProducto', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// 1:N - Cliente tiene muchas Ventas
Cliente.hasMany(Venta, { foreignKey: 'clienteId' });
Venta.belongsTo(Cliente, { foreignKey: 'clienteId' });

// 1:N - Proveedor tiene muchos Productos
Proveedor.hasMany(Producto, { foreignKey: 'proveedorId' });
Producto.belongsTo(Proveedor, { foreignKey: 'proveedorId' });

// N:M - Venta <-> Producto (con tabla intermedia)
Venta.belongsToMany(Producto, { through: VentaProducto, foreignKey: 'ventaId' });
Producto.belongsToMany(Venta, { through: VentaProducto, foreignKey: 'productoId' });

// Importar los modelos
import User from './User.model';
import Role from './Role.model';

// Establecer la relación entre Usuario y Role
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// Tabla intermedia para role_users
const RoleUser = sequelize.define('role_users', {
  RoleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { timestamps: false });

// Asociaciones User-Role (N:M)
User.belongsToMany(Role, { through: RoleUser });
Role.belongsToMany(User, { through: RoleUser });

// Add logic to populate RoleUser table during user creation
User.prototype.addRole = async function(role: Role) {
  await RoleUser.create({ RoleId: role.id, UserId: this.id });
};

// Tabla intermedia para resource_roles
const ResourceRole = sequelize.define('resource_roles', {
}, { timestamps: false });

// Asociaciones Role-Resource (N:M)
Role.belongsToMany(Resource, { through: ResourceRole });
Resource.belongsToMany(Role, { through: ResourceRole });

// Asociación User-RefreshToken (1:N)
User.hasMany(RefreshToken, { foreignKey: 'user_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

export { RoleUser, ResourceRole };
