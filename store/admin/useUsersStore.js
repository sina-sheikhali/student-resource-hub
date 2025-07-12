import { create } from "zustand";
import { client } from "@/client/client";
import { adminApi } from "@/api/admin/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
const useUserStore = create((set, get) => ({
  users: [],
  userEnrollments: [],
  setUserEnrollments: (userEnrollments) => set({ userEnrollments }),

  setUsers: (users) => set({ users }),
  fetchAllUsers: () => {
    const { setUsers } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("fetchUsersLoading")) return;
    setLoading("fetchUsersLoading", true);

    client(adminApi.fetchAllUsers)
      .then((res) => setUsers(res.data.data))
      .finally(() => setLoading("fetchUsersLoading", false));
  },

  updateUser: (userId, name, setIsOpen) => {
    const { fetchAllUsers } = get();

    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("updateUserLoading")) return;
    setLoading("updateUserLoading", true);
    client
      .put(adminApi.updateUser(userId) + `?name=${name}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("به روز رسانی انجام شد");
          setIsOpen(false);
          fetchAllUsers();
        }
      })
      .finally(() => setLoading("updateUserLoading", false));
  },
  fetchUserEnrollments: (userId) => {
    const { setUserEnrollments } = get();

    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("fetchUserEnrollmentsLoading")) return;
    setLoading("fetchUserEnrollmentsLoading", true);

    client(adminApi.fetchUserEnrollments(userId))
      .then((res) => setUserEnrollments(res.data.data))
      .finally(() => setLoading("fetchUserEnrollmentsLoading", false));
  },
}));

export default useUserStore;
