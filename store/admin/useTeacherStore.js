import { create } from "zustand";
import { client } from "@/client/client";
import { adminApi } from "@/api/admin/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
const useTeacherStore = create((set, get) => ({
  teachers: [],
  teacherDetails: "",
  setTeachers: (teachers) => set({ teachers }),
  setTeacherDetails: (teacherDetails) => set({ teacherDetails }),
  fetchTeachers: () => {
    const { setTeachers } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("fetchTeachersLoading")) return;
    setLoading("fetchTeachersLoading", true);

    client(adminApi.fetchTeachers)
      .then((res) => setTeachers(res.data.data))
      .finally(() => setLoading("fetchTeachersLoading", false));
  },
  fetchTeacherDetails: (teacherId) => {
    const { setTeacherDetails } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("teacherDetailsLoading")) return;
    setLoading("teacherDetailsLoading", true);

    client(adminApi.teacherDetails(teacherId))
      .then((res) => {
        console.log(res.data.data);

        setTeacherDetails(res.data.data);
      })
      .finally(() => setLoading("teacherDetailsLoading", false));
  },
  createTeacher: (data, reset) => {
    const { fetchTeachers } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("createTeacherLoading")) return;
    setLoading("createTeacherLoading", true);
    client
      .post(adminApi.createTeacher, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("استاد جدید اضافه شد");
          fetchTeachers();
          reset();
        }
      })
      .finally(() => setLoading("createTeacherLoading", false));
  },
  updateTeachers: (teacherId, data, setIsOpen) => {
    const { fetchTeachers } = get();

    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("updateTeacherLoading")) return;
    setLoading("updateTeacherLoading", true);
    client
      .put(adminApi.updateTeacher(teacherId), data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("به روز رسانی انجام شد");
          setIsOpen(false);
          fetchTeachers();
        }
      })
      .finally(() => setLoading("updateTeacherLoading", false));
  },
  deleteTeachers: (teacherId) => {
    const { fetchTeachers } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("deleteTeacherLoading")) return;
    setLoading("deleteTeacherLoading", true);
    client
      .delete(adminApi.deleteTeacher(teacherId))
      .then((res) => {
        if (res.status === 200) {
          toast.success("استاد مورد نظر حذف شد");
          fetchTeachers();
        }
      })
      .finally(() => setLoading("deleteTeacherLoading", false));
  },
}));

export default useTeacherStore;
