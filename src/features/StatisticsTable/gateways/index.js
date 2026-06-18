import { API_URL } from '../../../common/constants/index.js';

export const StatisticsGateway = {
  async fetchUsers(page = 1, rowsPerPage = 16) {
    const response = await fetch(`${API_URL}/users?page=${page}&rowsPerPage=${rowsPerPage}`);
    if (!response.ok) throw new Error('Error loading users');
    return response.json();
  },

  async fetchUsersStats(userIds) {
    const response = await fetch(`${API_URL}/users/statistics?userIds=${userIds}`);
    if (!response.ok) throw new Error('Error loading statistics');
    return response.json();
  }
};