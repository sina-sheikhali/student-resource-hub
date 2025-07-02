export const courseApi = {
  fetchCourseByFilter: "/filters",
  fetchCourseDetails: (id) => `/courses/${id}`,
  insertRate: (id) => `/rating/${id}`,
  getInrollment: "/enrollment",
  registerCourse: "/register",
};
