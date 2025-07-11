export const resourceApi = {
  fetchResourcesCourse: (id) => `/resources/course/${id}`,
  fetchResource: (id) => `/resources/${id}`,
  downloadResource: (id) => `/resources/${id}/download`,
};
