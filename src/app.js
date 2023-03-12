import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { CheckIn, CheckOut, User } from './models/index.js';
import sequelize from './utils/database.js';
import { authRoutes, checkRoutes, statisticRoutes, userRoutes } from './routes/index.js';
import swaggerDocs from './utils/swagger.js';
import mqtt from 'mqtt';
import { Op } from 'sequelize';

const client = mqtt.connect('tcp://broker.hivemq.com:1883');

client.on('connect', () => {
  client.subscribe('iot-nhom7');
  console.log('subscribed to test');
});

// {'username': 'vietanh', 'label': 'in', 'exit': 'y'}
// {'username': 'minhnhat123', 'password': 'vietanh0986097736', 'exit': 'n'}

// a = {
//   username: 'Nhat',
//   label: 'i' | 'o',
//   exit: 'y' | 'n',
// };

client.on('message', (topic, message) => {
  console.log('received message %s %s', topic, message.toString());
  // register new user
  if (message.password && message.exit === 'n') {
    const checkUser = User.findOne({ where: { username: message.username } });
    if (checkUser) {
      console.log('User already exists');
    }
    const user = new User({ username: message.username, password: message.password });
    user.save();
  } else if (message.exit === 'y') {
    if (message.label === 'in') {
      // check in
      const checkUser = User.findOne({ where: { username: message.username } });
      if (!checkUser) {
        console.log('User not exists');
      }
      const date = new Date();
      const checkDate = CheckIn.findOne({
        where: {
          userId: checkUser.id,
          date: {
            [Op.between]: [date.setHours(0, 0, 0, 0), date.setHours(23, 59, 59, 999)],
          },
        },
      });
      if (checkDate) {
        console.log('User already checked in');
      } else {
        const checkIn = new CheckIn({ userId: checkUser.id, date });
        checkIn.save();
      }
    } else if (message.label === 'out') {
      // check out
      const checkUser = User.findOne({ where: { username: message.username } });
      if (!checkUser) {
        console.log('User not exists');
      }
      const date = new Date();
      const checkDate = CheckOut.findOne({
        where: {
          userId: checkUser.id,
          date: {
            [Op.between]: [date.setHours(0, 0, 0, 0), date.setHours(23, 59, 59, 999)],
          },
        },
      });
      if (checkDate) {
        CheckOut.update({ date }, { where: { id: checkDate.id } });
      } else {
        const checkOut = new CheckOut({ userId: checkUser.id, date });
        checkOut.save();
      }
    }
  }
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
