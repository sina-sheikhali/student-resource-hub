import { create } from "zustand";

const useLoadingStore = create((set, get) => ({
  loadingStates: {},
  setLoading: (key, value) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: value,
      },
    })),
  isLoading: (key) => get().loadingStates[key] || false,
}));

export default useLoadingStore;
