import requestData from '@/commons/libs/requestData';

export const apiInterests = (email) => {
  return requestData('/thesis/interest/' + email);
};
