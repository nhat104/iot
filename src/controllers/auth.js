import { User } from '../models/index.js';
import * as ResponseJson from '../utils/ResponseJson.js';
import * as UserValidate from '../validations/user.js';

export const signup = async (req, res) => {
  const { value, error } = UserValidate.signupSchema.validate(req.body);

  if (error) {
    return ResponseJson.error(res, error.details[0].message, 422);
  }
  const { fullName, username, password, address, phone, birthday, role = 'employee' } = value;

  try {
    const user = await User.create({
      fullName,
      username,
      password,
      address,
      phone,
      birthday,
      role,
    });
    const data = {
      user: { id: user.id, username, fullName, role, address, phone, birthday, role },
    };
    ResponseJson.created(res, data);
  } catch (err) {
    ResponseJson.error(res, err);
  }
};

export const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username, password } })
    .then((user) => {
      if (!user) {
        return ResponseJson.unauthorized(res, {
          error: 'Wrong username or password. Please try again.',
        });
      }
      const data = {
        user: {
          id: user.id,
          username,
          fullName: user.fullName,
          address: user.address,
          phone: user.phone,
          birthday: user.birthday,
          role: user.role,
        },
      };
      ResponseJson.success(res, data);
    })
    .catch((err) => {
      ResponseJson.error(res, err);
    });
};
