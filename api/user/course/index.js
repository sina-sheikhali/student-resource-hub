export const courseApi = {
  fetchCourseByFilter: "/filters",
  fetchCourseDetails: (id) => `/courses/${id}`,
  insertRate: "/ratings",
  getEnrollment: "/enrollments",
  registerCourse: "/enrollments",
  fetchMyCourses: "/my-courses",
  fetchComments: (id) => `/comments/${id}`,
  createComment: "/comments",
  searchCourse: (value) => `/courses/search?q=${value}`,
};
