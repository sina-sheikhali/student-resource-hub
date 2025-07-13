import { categoryApi } from "./category";
import { collegeApi } from "./college";
import { courseApi } from "./course";
import { resourceApi } from "./resource";
import { statisticApi } from "./statistics";
import { studentsApi } from "./stundents";
import { teachersApi } from "./teachers";

export const adminApi = {
  ...collegeApi,
  ...categoryApi,
  ...courseApi,
  ...resourceApi,
  ...studentsApi,
  ...statisticApi,
  ...teachersApi,
};
