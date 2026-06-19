import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '../../../common/constants/index.js';

export const API_URL = 'https://appco-snowy.vercel.app/api';

export const StatisticsGateway = {
  async fetchUsers(page = DEFAULT_PAGE, rowsPerPage = DEFAULT_ROWS_PER_PAGE) {
    const response = await fetch(`${API_URL}/users?page=${page}&rowsPerPage=${rowsPerPage}`);
    if (!response.ok) throw new Error('Error loading users');
    return response.json();
  },

  async fetchUsersStats(page = DEFAULT_PAGE, rowsPerPage = DEFAULT_ROWS_PER_PAGE) {
    const startId = (page - 1) * rowsPerPage + 1;
    const idsArray = Array.from({ length: rowsPerPage }, (_, index) => startId + index);
    const userIds = idsArray.join(',');
    
    const response = await fetch(`${API_URL}/users/statistics?userIds=${userIds}`);
    if (!response.ok) throw new Error('Error loading statistics');
    return response.json();
  }
};