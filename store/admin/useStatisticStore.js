import { create } from "zustand";
import { client } from "@/client/client";
import { adminApi } from "@/api/admin/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
const useStatisticStore = create((set, get) => ({
  statistics: [],
  setStatistics: (statistics) => set({ statistics }),

  fetchStatistics: () => {
    const { setStatistics } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();

    if (isLoading("fetchStatisticsLoading")) return;
    setLoading("fetchStatisticsLoading", true);

    client(adminApi.fetchStatistic)
      .then((res) => setStatistics(res.data.data))
      .finally(() => setLoading("fetchStatisticsLoading", false));
  },
}));

export default useStatisticStore;
