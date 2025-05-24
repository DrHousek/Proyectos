import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface RoleAttributes {
  id?: number;
  name: string;
  is_active: boolean;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public is_active!: boolean;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Role',
  }
);

export default Role;