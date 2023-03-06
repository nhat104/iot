import baseApiRequest from './baseApiRequest';

const checkApi = {
  checkIn(body) {
    return baseApiRequest.post('check-in', body);
  },
  checkOut(body) {
    return baseApiRequest.post('check-out', body);
  },
};

export default checkApi;
