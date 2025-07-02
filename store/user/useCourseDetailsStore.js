import { create } from "zustand";
import { client } from "@/client/client";
import { userApi } from "@/api/user/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";

const useCourseDetailsStore = create((set, get) => ({
  insertRate: (id, rate) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("insertRateLoaing")) return;
    setLoading("insertRateLoaing", true);
    client
      .put(userApi.insertRate(id), rate)
      .then((res) => {
        toast.success("ثبت شد");
      })
      .finally(() => setLoading("insertRateLoaing", true));
  },

  getEnrollment: () => {
    client(userApi.getInrollment).then((res) => {});
  },
  registerCourse: () => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("registerCourseLoading")) return;
    setLoading("registerCourseLoading", true);

    client
      .post(api.registerCourse)
      .then((res) => {
        if (res.status === 200) {
          toast.success("ثبت نام موفق");
        }
      })
      .catch((err) => toast.error("ثبت نام ناموفق"))
      .finally(() => setLoading("registerCourseLoading", false));
  },
}));
export default useCourseDetailsStore;
