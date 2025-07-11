import { authApi } from "./auth";
import { courseApi } from "./course";
import { resourceApi } from "./resource";
export const userApi = {
  ...authApi,
  ...courseApi,
  ...resourceApi,
};
