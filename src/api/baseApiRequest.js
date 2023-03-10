import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;

const baseApiRequest = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
baseApiRequest.interceptors.request.use((config) => {
  const newConfig = { ...config };
  // set token
  // if (!!newConfig.headers) {
  //   const user = JSON.parse(localStorage.getItem('user_iot'));
  //   if (user?.token) {
  //     newConfig.headers.Authorization = `Bearer ${user.token}`;
  //   }
  // }
  return newConfig;
});

baseApiRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      // remove token
      // console.log(error.response.data.messages[0].message);
      // store.dispatch({ type: 'walletAddress/logoutSuccess' });
    }
    throw error;
  }
);

export default baseApiRequest;
