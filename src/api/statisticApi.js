import baseApiRequest from './baseApiRequest';

const statisticApi = {
  getByWeek() {
    return baseApiRequest.get('statistic-by-week');
  },

  getWorkHoursByWeek() {
    return baseApiRequest.get('work-hour-by-week');
  },
};

export default statisticApi;
