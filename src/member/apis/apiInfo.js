import requestData from '@/commons/libs/requestData';
export const getJobs = () => requestData('/member/job');
