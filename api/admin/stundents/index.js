export const studentsApi = {
  fetchAllUsers: "/admin/users",
  updateUser: (id) => `/admin/users/${id}`,
  fetchUserEnrollments: (id) => `/admin/users/${id}/courses`,
};
