import API from './api';


export const getUserProfile = async () => {
  const { data } = await API.get('/user/profile');
  return data;
};
