import { categoryApi } from "./category";
import { collegeApi } from "./college";
import { courseApi } from "./course";

export const adminApi = {
  ...collegeApi,
  ...categoryApi,
  ...courseApi,
};
