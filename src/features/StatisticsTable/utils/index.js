export const combineUsersWithStats = (users, stats) => {
  return users.map(user => {
    const userDays = stats.filter(stat => stat.user_id === user.id);
    const totalClicks = userDays.reduce((sum, day) => sum + (day.clicks || 0), 0);
    const totalPageViews = userDays.reduce((sum, day) => sum + (day.page_views || 0), 0);
    
    return { ...user, totalClicks, totalPageViews };
  });
}