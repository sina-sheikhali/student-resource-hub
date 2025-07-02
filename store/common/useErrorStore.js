import { create } from "zustand";
import { toast } from "react-toastify";

const useErrorStore = create((set) => ({
  errorMessage: null,
  setErrorMessage: (message) => {
    set({ errorMessage: message });
    toast.error(message);
  },
}));

export default useErrorStore;
