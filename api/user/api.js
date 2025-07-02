import { authApi } from "./auth";
import { courseApi } from "./course";
export const userApi = {
  ...authApi,
  ...courseApi,
};
