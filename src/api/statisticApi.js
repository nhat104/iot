import baseApiRequest from './baseApiRequest';

const statisticApi = {
  getByWeek() {
    return baseApiRequest.get('statistic-by-week');
  },

  getWorkHoursByWeek() {
    return baseApiRequest.get('work-hour-by-week');
  },

  latestCheckIn(limit = 10) {
    return baseApiRequest.get(`latest-check-in?limit=${limit}`);
  },

  latestCheckOut(limit = 10) {
    return baseApiRequest.get(`latest-check-out?limit=${limit}`);
  },
};

export default statisticApi;
