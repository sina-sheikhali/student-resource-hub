import { create } from "zustand";
import { client } from "@/client/client";
import { userApi } from "@/api/user/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
import { comment } from "postcss";

const useCourseDetailsStore = create((set, get) => ({
  enrollment: "",
  comments: [],
  setEnrollment: (enrollment) => set({ enrollment }),
  setComments: (comments) => set({ comments }),
  insertRate: (data) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("insertRateLoaing")) return;
    setLoading("insertRateLoaing", true);
    client
      .post(userApi.insertRate, data)
      .then((res) => {
        toast.success("امتیاز شما ثبت شد");
      })
      .finally(() => setLoading("insertRateLoaing", true));
  },
  updateRate: (data) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("updateRateLoaing")) return;
    setLoading("updateRateLoaing", true);
    client
      .put(
        userApi.insertRate +
          `/${data.course_id}?course_id=${data.course_id}&rating=${data.rating}`,
      )
      .then((res) => {
        toast.success("امتیاز شما ثبت شد");
      })
      .finally(() => setLoading("updateRateLoaing", true));
  },

  getEnrollment: () => {
    const { setEnrollment } = get();
    client(userApi.getEnrollment).then((res) => {
      setEnrollment(res.data.data);
    });
  },
  registerCourse: (data) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("registerCourseLoading")) return;
    setLoading("registerCourseLoading", true);

    client
      .post(userApi.registerCourse, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("ثبت نام موفق");
        }
      })
      .finally(() => setLoading("registerCourseLoading", false));
  },
  fetchComments: (courseId) => {
    const { setComments } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchCommentsLoading")) return;
    setLoading("fetchCommentsLoading", true);
    client(userApi.fetchComments(courseId))
      .then((res) => {
        setComments(res.data.data);
      })
      .finally(() => setLoading("fetchCommentsLoading", false));
  },
  createComment: (data, setComment, setCreateCommentBox) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("createCommentLoading")) return;
    setLoading("createCommentLoading", true);
    client
      .post(userApi.createComment, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("نظر شما ثبت شد");
          setComment("");
          setCreateCommentBox("");
        }
      })
      .finally(() => setLoading("createCommentLoading", false));
  },
}));
export default useCourseDetailsStore;
