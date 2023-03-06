import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { CheckIn, CheckOut, User } from './models/index.js';
import sequelize from './utils/database.js';
import { authRoutes, checkRoutes, statisticRoutes, userRoutes } from './routes/index.js';
import swaggerDocs from './utils/swagger.js';
import mqtt from 'mqtt';

const client = mqtt.connect('tcp://broker.hivemq.com:1883');

client.on('connect', () => {
  client.subscribe('iot-nhom7');
  console.log('subscribed to test');
});

// a = {
//   username: 'Nhat',
//   label: 'i' | 'o',
//   exit: 'y' | 'n',
// };

client.on('message', (topic, message) => {
  console.log('received message %s %s', topic, message.toString());
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// All route
app.use('/auth', authRoutes);
app.use(checkRoutes);
app.use(statisticRoutes);
app.use('/users', userRoutes);

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
