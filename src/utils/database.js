import { Sequelize } from 'sequelize';

// Kết nối với mysql
const sequelize = new Sequelize('iot', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: { timestamps: false },
});

export default sequelize;
