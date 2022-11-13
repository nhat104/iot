import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { CheckIn, CheckOut, User } from './models/index.js';
import sequelize from './utils/database.js';
import { authRoutes, checkRoutes } from './routes/index.js';
import swaggerDocs from './utils/swagger.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// All route
app.use('/auth', authRoutes);
app.use(checkRoutes);

// associations
CheckIn.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(CheckIn);
CheckOut.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(CheckOut);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(8000);
    swaggerDocs(app, 8000);
  })
  .catch((err) => {
    console.log(err);
  });
