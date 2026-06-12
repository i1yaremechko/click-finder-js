const API_URL = 'https://appco-snowy.vercel.app/api';

export const UsersService = {
  async getUsers(page = 1, limit = 16) {
    try {
      const response = await fetch(`${API_URL}/users?page=${page}&rowsPerPage=${limit}`);
      if (!response.ok) throw new Error('Error loading users.');
      return await response.json(); 
    } catch (error) {
      console.error('UsersService.getUsers error:', error);
      return null;
    }
  },

  async getUsersStats(userIds) {
    try {
      const response = await fetch(`${API_URL}/users/statistics?userIds=${userIds}`);
      if (!response.ok) throw new Error('Error loading statistics');
      return await response.json();
    } catch (error) {
      console.error('UsersService.getUsersStats error:', error);
      return null;
    }
  },

  async getFullUsersData(page = 1) {
    const usersResponse = await this.getUsers(page);
    let users = [];
    let pagesCount = 1;
    
    if (usersResponse && usersResponse.data) {
      users = usersResponse.data;
      pagesCount = usersResponse.pagesCount || 1;
    }
    
    if (users.length === 0) return { users: [], pagesCount };

    const userIds = users.map(user => user.id).join(',');
    const stats = await this.getUsersStats(userIds);

    const combinedData = users.map(user => {
      const userDays = stats.filter(stat => stat.user_id === user.id);
      const totalClicks = userDays.reduce((sum, day) => sum + (day.clicks || 0), 0);
      const totalPageViews = userDays.reduce((sum, day) => sum + (day.page_views || 0), 0);
      
      return { ...user, totalClicks, totalPageViews };
    });

    return { users: combinedData, pagesCount };
  }
};