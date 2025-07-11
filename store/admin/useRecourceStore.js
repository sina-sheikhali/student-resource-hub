import { create } from "zustand";
import { client } from "@/client/client";
import { adminApi } from "@/api/admin/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
import axios from "axios";

const useResourceStore = create((set, get) => ({
  resourcesCourse: [],
  setResourcesCourse: (resourcesCourse) => set({ resourcesCourse }),
  fetchResourcesCourse: (courseId) => {
    const { setResourcesCourse } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchResourcesCourseLoading")) return;
    setLoading("fetchResourcesCourseLoading", true);

    client(adminApi.fetchResoucesCourse(courseId))
      .then((res) => {
        setResourcesCourse(res.data.data);
      })
      .finally(() => setLoading("fetchResourcesCourseLoading", false));
  },
  createResources: (
    data,
    setSelecetedPhoto,
    setSelectedFile,
    reset,
    setProgress,
    cancelUploadRef,
  ) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("createResourcesLoading")) return;

    setLoading("createResourcesLoading", true);
    const cancelTokenSource = axios.CancelToken.source();
    cancelUploadRef.current = cancelTokenSource;

    client
      .post(adminApi.createResources, data, {
        cancelToken: cancelTokenSource.token,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress(+percentCompleted.toFixed(2));
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("عملیات موفق");
          setSelecetedPhoto("");
          setSelectedFile("");
          reset();
        }
      })

      .finally(() => {
        setLoading("createResourcesLoading", false);
        setProgress(0);
      });
  },

  updateRecources: (data) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("updateResourcesLoading")) return;
    setLoading("updateResourcesLoading", true);
    client
      .put(adminApi.updateResources, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(" عملیات موفق");
        }
      })
      .finally(() => setLoading("updateResourcesLoading", false));
  },
  deleteResources: () => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("deleteResourcesLoading")) return;
    setLoading("deleteResourcesLoading", true);
    client
      .delete(adminApi.deleteResources, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(" عملیات موفق");
        }
      })
      .finally(() => setLoading("deleteResourcesLoading", false));
  },
}));

export default useResourceStore;
