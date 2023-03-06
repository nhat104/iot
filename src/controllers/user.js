import { User } from '../models/index.js';
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
