import { create } from "zustand";
import { client } from "@/client/client";
import { adminApi } from "@/api/admin/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
const useTeacherStore = create((set, get) => ({
  colleges: [],
  collegeDetails: "",
  setColleges: (colleges) => set({ colleges }),
  setCollegeDetails: (collegeDetails) => set({ collegeDetails }),
  fetchAllColleges: () => {
    const { setColleges } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("fetchCollegesLoading")) return;
    setLoading("fetchCollegesLoading", true);

    client(adminApi.colleges)
      .then((res) => setColleges(res.data.data))
      .finally(() => setLoading("fetchCollegesLoading", false));
  },
  fetchCollegeDetails: (collegeId) => {
    const { setCollegeDetails } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("collegeDetailsLoading")) return;
    setLoading("collegeDetailsLoading", true);

    client(adminApi.collegeDetails(collegeId))
      .then((res) => {
        setCollegeDetails(res.data.data);
      })
      .finally(() => setLoading("collegeDetailsLoading", false));
  },

  createCollege: (data, reset) => {
    const { fetchAllColleges } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("createCollegeLoading")) return;
    setLoading("createCollegeLoading", true);
    client
      .post(adminApi.colleges, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("دانشکده جدید ثبت شد");
          fetchAllColleges();
          reset();
        }
      })
      .finally(() => setLoading("createCollegeLoading", false));
  },
  updateCollege: (collegeId, data, setIsOpen) => {
    const { fetchAllColleges } = get();

    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("updateCollegeLoading")) return;
    setLoading("updateCollegeLoading", true);
    client
      .put(adminApi.collegeDetails(collegeId), data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("به روز رسانی انجام شد");
          setIsOpen(false);
          fetchAllColleges();
        }
      })
      .finally(() => setLoading("updateCollegeLoading", false));
  },
  deleteCollege: (collegeId) => {
    const { fetchAllColleges } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("deleteCollegeLoading")) return;
    setLoading("deleteCollegeLoading", true);
    client
      .delete(adminApi.collegeDetails(collegeId))
      .then((res) => {
        if (res.status === 200) {
          toast.success("دانشکده مورد نظر حذف شد");
          fetchAllColleges();
        }
      })
      .finally(() => setLoading("deleteCollegeLoading", false));
  },
}));

export default useTeacherStore;
