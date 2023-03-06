import baseApiRequest from './baseApiRequest';

const authApi = {
  login(body) {
    return baseApiRequest.post('auth/login', body);
  },
};

export default authApi;
