import { CheckIn, CheckOut, User } from '../models/index.js';
import sequelize from '../utils/database.js';
import * as ResponseJson from '../utils/ResponseJson.js';
import * as StatisticValidate from '../validations/statistic.js';

export const statisticByDay = async (req, res) => {
  const { value, error } = StatisticValidate.getByDateSchema.validate(req.body);
  if (error) {
    return ResponseJson.error(res, error.details[0].message);
  }
  try {
    const { date } = value;
    const gte8H = await countGte8H(date, res);
    // const checkIn = await CheckIn.findAll({
    //   where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m-%d'), date),
    //   order: [['date', 'ASC']],
    // });
    // const checkOut = await CheckOut.findAll({
    //   where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m-%d'), date),
    //   order: [['date', 'DESC']],
    // });
    // if (!checkIn) {
    //   return ResponseJson.error(res, 'Check in not found');
    // }
    // if (!checkOut) {
    //   return ResponseJson.error(res, 'Check out not found');
    // }
    // // count the difference between the two id greater than 20
    // const gte8H = checkOut.filter((item) => {
    //   const check = checkIn.find((item2) => item2.userId === item.userId);
    //   if (check) {
    //     const hourOut = new Date(item.date).getHours();
    //     const hourIn = new Date(check.date).getHours();
    //     if (hourOut - hourIn >= 8) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });

    ResponseJson.success(res, gte8H);
  } catch (err) {
    ResponseJson.error(res, err);
  }
};

export const statisticByWeek = async (req, res) => {
  try {
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
      }
      dateArr.push(date);
    }
    const gte8Hs = [];

    await Promise.all(
      dateArr.map(async (date) => {
        const gte8H = await countGte8H(date, res);
        gte8Hs.push(gte8H);
      })
    );

    ResponseJson.success(res, { dateArr, gte8Hs });
  } catch (err) {
    ResponseJson.error(res, err);
  }
};

export const getWorkHoursByWeek = async (req, res) => {
  try {
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
      }
      dateArr.push(date);
    }
    const workHours = [];

    await Promise.all(
      dateArr.map(async (date) => {
        const workHour = await getWorkHoursByDate(date, res);
        workHours.push(workHour);
      })
    );

    ResponseJson.success(res, { dateArr, workHours });
  } catch (err) {
    ResponseJson.error(res, err);
  }
};

const countGte8H = async (date, res) => {
  const checkIn = await CheckIn.findAll({
    where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'), date),
  });
  const checkOut = await CheckOut.findAll({
    where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'), date),
  });
  if (!checkIn) {
    return ResponseJson.error(res, 'Check in not found');
  }
  if (!checkOut) {
    return ResponseJson.error(res, 'Check out not found');
  }
  const gte8H = checkOut.filter((item) => {
    const check = checkIn.find((item2) => item2.userId === item.userId);
    if (check) {
      const hourOut = new Date(item.date).getHours();
      const hourIn = new Date(check.date).getHours();
      if (hourOut - hourIn >= 8) {
        return true;
      }
    }
    return false;
  });
  return gte8H.length;
};

// const getWorkHours = async (userId, date, res) => {
//   // get the earliest check in
//   const checkIn = await CheckIn.findAll({
//     where: {
//       userId,
//       date: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'), date),
//     },
//     order: [['date', 'ASC']],
//   });
//   // get the latest check out
//   const checkOut = await CheckOut.findAll({
//     where: {
//       userId,
//       date: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'), date),
//     },
//     order: [['date', 'DESC']],
//   });
//   if (!checkIn || !checkOut) {
//     return 0;
//   }
//   const hourOut = new Date(checkOut[0].date).getHours();
//   const hourIn = new Date(checkIn[0].date).getHours();

//   return hourOut - hourIn;
// };

const getWorkHoursByDate = async (date, res) => {
  const checkIn = await CheckIn.findAll({
    where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'), date),
  });
  const checkOut = await CheckOut.findAll({
    where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%m/%d/%Y'), date),
  });
  if (!checkIn) {
    return ResponseJson.error(res, 'Check in not found');
  }
  if (!checkOut) {
    return ResponseJson.error(res, 'Check out not found');
  }
  let sum = 0;
  checkOut.forEach((item) => {
    const check = checkIn.find((item2) => item2.userId === item.userId);
    if (check) {
      const hourOut = new Date(item.date).getHours();
      const hourIn = new Date(check.date).getHours();
      sum += hourOut - hourIn;
    }
  });
  return sum;
};

export const latestCheckIn = async (req, res) => {
  try {
    const { limit } = req.query;
    const checkIn = await CheckIn.findAll({
      order: [['date', 'DESC']],
      limit: +limit || 10,
      include: [{ model: User, attributes: ['fullName'] }],
      group: ['date', 'userId'],
    });
    if (!checkIn) {
      return ResponseJson.error(res, 'Check in not found');
    }
    ResponseJson.success(res, checkIn);
  } catch (err) {
    ResponseJson.error(res, err);
  }
};

export const latestCheckOut = async (req, res) => {
  try {
    const { limit } = req.query;
    const checkOut = await CheckOut.findAll({
      order: [['date', 'DESC']],
      limit: +limit || 10,
      include: [{ model: User, attributes: ['fullName'] }],
      group: ['date', 'userId'],
    });
    if (!checkOut) {
      return ResponseJson.error(res, 'Check out not found');
    }
    ResponseJson.success(res, checkOut);
  } catch (err) {
    ResponseJson.error(res, err);
  }
};
