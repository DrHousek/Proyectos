import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface ResourceAttributes {
  id?: number;
  path: string;
  method: string;
  is_active: boolean;
}

class Resource extends Model<ResourceAttributes> implements ResourceAttributes {
  public id!: number;
  public path!: string;
  public method!: string;
  public is_active!: boolean;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Resource',
    tableName: 'resources'
  }
);

export default Resource;