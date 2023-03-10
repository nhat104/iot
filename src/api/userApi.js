import baseApiRequest from './baseApiRequest';

const userApi = {
  list() {
    return baseApiRequest.get('users');
  },
  add(body) {
    return baseApiRequest.post('users', body);
  },
  edit({ id, body }) {
    return baseApiRequest.put(`users/${id}`, body);
  },
  delete(id) {
    return baseApiRequest.delete(`users/${id}`);
  },
  filter(body) {
    return baseApiRequest.post('users/search', body);
  },
  statisticByWeek(body) {
    return baseApiRequest.post('users/statistic/week', body);
  },
  workHourByWeek(body) {
    return baseApiRequest.post('users/work-hour/week', body);
  },
};

export default userApi;
