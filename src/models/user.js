import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: DataTypes.DATE,
  address: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: 'employee',
  },
});

export default User;
