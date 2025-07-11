import { create } from "zustand";
import { client } from "@/client/client";
import { userApi } from "@/api/user/api";
import { toast } from "react-toastify";
import useLoadingStore from "./useLoadingStore";

export const useAuthStore = create((set, get) => ({
  signIn: (data, router) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("signInLoading")) return;

    setLoading("signInLoading", true);

    client
      .post(userApi.signIn, data)
      .then((res) => {
        const token = res.data?.data?.token;
        const role_token = res.data?.data?.role_token;

        if (token && role_token) {
          document.cookie = `role_token=${role_token}; path=/; max-age=${60 * 60 * 24 * 7};`;
          document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7};`;
          toast.success("خوش آمدید");
          router.push("/");
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading("signInLoading", false);
      });
  },
  signUp: (data, router) => {
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("signUpLoading")) return;

    setLoading("signUpLoading", true);
    client
      .post(userApi.signUp, data)
      .then((res) => {
        const token = res.data?.data?.token;
        const role_token = res.data?.data?.role_token;

        if (token && role_token) {
          document.cookie = `role_token=${role_token}; path=/; max-age=${60 * 60 * 24 * 7};`;
          document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7};`;

          toast.success("خوش آمدید");
          router.push("/");
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading("signUpLoading", false);
      });
  },
}));
