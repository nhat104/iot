import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const CheckOut = sequelize.define('checkOut', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default CheckOut;
