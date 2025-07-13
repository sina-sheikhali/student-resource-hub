export const teachersApi = {
  fetchTeachers: "/admin/teachers",
  createTeacher: "/admin/teachers",
  teacherDetails: (id) => `/admin/teachers/${id}`,
  updateTeacher: (id) => `/admin/teachers/${id}`,
  deleteTeacher: (id) => `/admin/teachers/${id}`,
};
