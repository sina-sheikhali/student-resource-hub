import { create } from "zustand";
import { client } from "@/client/client";
import { adminApi } from "@/api/admin/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
const useCourseStore = create((set, get) => ({
  courses: [],
  course: {},
  setCourse: (course) => set({ course }),
  selectedRowId: "",
  setSelectedRowId: (selectedRowId) => set({ selectedRowId }),
  setCourses: (courses) => set({ courses }),
  fetchCourses: () => {
    const { setCourses } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchCoursesLoading")) return;
    setLoading("fetchCoursesLoading", true);

    client(adminApi.fetchCourses)
      .then((res) => {
        setCourses(res.data.data);
      })
      .finally(() => setLoading("fetchCoursesLoading", false));
  },

  updateCourse: (id, data, setIsOpen = null) => {
    const { fetchCourses } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("updateCourseLoading")) return;
    setLoading("updateCourseLoading", true);
    client
      .put(adminApi.courseDetails(id), data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("به روز رسانی انجام شد");
          fetchCourses();
          setIsOpen && setIsOpen(false);
        }
      })
      .finally(() => setLoading("updateCourseLoading", false));
  },
  deleteCourse: (id) => {
    const { fetchCourses } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("deleteCourseLoading")) return;
    setLoading("deleteCourseLoading", true);
    client
      .delete(adminApi.courseDetails(id))
      .then((res) => {
        if (res.status === 200) {
          toast.success("دوره مورد نظر حذف شد");
          fetchCourses();
        }
      })
      .finally(() => setLoading("deleteCourseLoading", false));
  },
  createCourse: (data, reset) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("createCourseLoading")) return;
    setLoading("createCourseLoading", true);
    client
      .post(adminApi.createCourse, { ...data, teacher: "11" })
      .then((res) => {
        if (res.status === 200) {
          toast.success("دوره اضافه شد");
          reset({
            name: "",
            description: "",
            category_id: "",
            college_id: "",
            status: "",
          });
        }
      })
      .finally(() => setLoading("createCourseLoading", false));
  },
  fetchCourse: (id) => {
    const { setCourse } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchCourseLoading")) return;
    setLoading("fetchCourseLoading", true);
    client(adminApi.courseDetails(id))
      .then((res) => {
        if (res.status === 200) {
          setCourse(res.data.data.course);
        }
      })
      .finally(() => setLoading("fetchCourseLoading", false));
  },
}));
export default useCourseStore;
