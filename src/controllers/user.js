import { CheckIn, CheckOut, User } from '../models/index.js';
import sequelize from '../utils/database.js';
import * as ResponseJson from '../utils/ResponseJson.js';
import * as UserValidate from '../validations/user.js';

export const getAllEmployee = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: 'employee' },
      attributes: ['id', 'fullName', 'username', 'role'],
    });
    return ResponseJson.success(res, users);
  } catch (error) {
    return ResponseJson.error(res, error);
  }
};

export const addEmployee = async (req, res) => {
  const { value, error } = UserValidate.addEmployee.validate(req.body);
  if (error) return ResponseJson.error(res, error.details[0].message);

  try {
    const { fullName, username, password } = value;
    const checkUser = await User.findOne({ where: { username } });
    if (checkUser) {
      return ResponseJson.error(res, 'Username already exists!', 211);
    }
    const user = await User.create({
      fullName,
      username,
      password,
      role: 'employee',
    });
    return ResponseJson.success(res, user);
  } catch (error) {
    return ResponseJson.error(res, error);
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { userId: id } = req.params;
    const { fullName, username, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) return ResponseJson.error(res, 'User not found!');
    await user.update({ fullName, username, password: password || user.password });
    return ResponseJson.success(res, user);
  } catch (error) {
    return ResponseJson.error(res, error);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { userId: id } = req.params;
    console.log(id);
    const user = await User.findByPk(id);
    if (!user) return ResponseJson.error(res, 'User not found!');
    await user.destroy();
    return ResponseJson.success(res, 'Delete user successfully!');
  } catch (error) {
    return ResponseJson.error(res, error);
  }
};

export const statisticByWeek = async (req, res) => {
  try {
    const { userId } = req.body;
    const dateNow = new Date();
    // get the date 1 week ago
    const dateStart = new Date(dateNow.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dateArr = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(dateStart.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString();
      const month = new Date(date).getMonth() + 1;
      const day = new Date(date).getDate();
      if (month < 10 && day < 10) {
        date = `0${month}/0${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
      } else if (day < 10) {
        date = `${month}/0${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
      } else if (month < 10) {
        date = `0${month}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
      } else {
        date = `${month}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
      }
      dateArr.push(date);
    }
    const data = await Promise.all(
      dateArr.map(async (date) => {
        const res = { date };
        const checkIn = await CheckIn.findOne({
          where: {
            userId,
            date: sequelize.where(
              sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'),
              date
            ),
          },
        });
        res.checkIn = checkIn ? new Date(checkIn.date).toLocaleTimeString() : "Don't check in";

        const checkOut = await CheckOut.findOne({
          where: {
            userId,
            date: sequelize.where(
              sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'),
              date
            ),
          },
        });
        res.checkOut = checkOut ? new Date(checkOut.date).toLocaleTimeString() : "Don't check out";
        if (checkIn && checkOut) {
          const workHour = new Date(checkOut.date).getTime() - new Date(checkIn.date).getTime();
          res.workHour = `${Math.floor(workHour / 3600000)}h ${Math.floor(
            (workHour % 3600000) / 60000
          )}m`;
        } else {
          res.workHour = '0h 0m';
        }

        return res;
      })
    );
    ResponseJson.success(res, data);
  } catch (err) {
    ResponseJson.error(res, err);
  }
};
