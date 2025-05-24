import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface RefreshTokenAttributes {
  id?: number;
  token: string;
  device_info: string;
  is_valid: boolean;
  expires_at: Date;
  created_at: Date;
  user_id: number;
}

class RefreshToken extends Model<RefreshTokenAttributes> implements RefreshTokenAttributes {
  public id!: number;
  public token!: string;
  public device_info!: string;
  public is_valid!: boolean;
  public expires_at!: Date;
  public created_at!: Date;
  public user_id!: number;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    device_info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens'
  }
);

export default RefreshToken;