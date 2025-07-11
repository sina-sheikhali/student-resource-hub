import { create } from "zustand";
import { client } from "@/client/client";
import { userApi } from "@/api/user/api";
import useLoadingStore from "../common/useLoadingStore";
const useResourceStore = create((set, get) => ({
  resourcesCourse: [],
  resource: "",

  setResourcesCourse: (resourcesCourse) => set({ resourcesCourse }),
  setResource: (resource) => set({ resource }),
  fetchResourcesCourse: (courseId) => {
    const { setResourcesCourse } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchResourcesCourse")) return;
    setLoading("fetchResourcesCourse", true);
    client(userApi.fetchResourcesCourse(courseId))
      .then((res) => {
        setResourcesCourse(res.data.data);
      })
      .finally(() => setLoading("fetchResourcesCourse", false));
  },
  fetchResourceDetails: (resourceId) => {
    const { setResource } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchResourceLoading")) return;
    setLoading("fetchResourceLoading", true);
    client(userApi.fetchResource(resourceId))
      .then((res) => {
        setResource(res.data.data);
      })
      .finally(() => setLoading("fetchResourceLoading", false));
  },
  downloadResource: (resourceId) => {
    const { setResource } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("downloadResourceLoading")) return;
    setLoading("downloadResourceLoading", true);
    client(userApi.downloadResource(resourceId))
      .then((res) => {
        setResource(res.data.data);
      })
      .finally(() => setLoading("downloadResourceLoading", false));
  },
}));

export default useResourceStore;
