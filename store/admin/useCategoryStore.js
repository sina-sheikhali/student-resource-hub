import { create } from "zustand";
import { client } from "@/client/client";
import { adminApi } from "@/api/admin/api";
import useLoadingStore from "../common/useLoadingStore";
import { toast } from "react-toastify";
const useCategoryStore = create((set, get) => ({
  categories: [],
  categoryDetails: "",
  setCategories: (categories) => set({ categories }),
  setCategoryDetails: (categoryDetails) => set({ categoryDetails }),
  fetchCategories: () => {
    const { setCategories } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchCategoriesLoading")) return;
    setLoading("fetchCategoriesLoading", true);
    client(adminApi.categories)
      .then((res) => {
        setCategories(res.data.data);
      })
      .finally(() => setLoading("fetchCategoriesLoading", false));
  },
  fetchCategoryDetails: (id) => {
    const { setCategoryDetails } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("categoryDetailsLoading")) return;
    setLoading("categoryDetailsLoading", true);
    client(adminApi.categoryDetails(id))
      .then((res) => {
        setCategoryDetails(res.data.data);
      })
      .finally(() => setLoading("categoryDetailsLoading", false));
  },
  createCategory: (data, reset) => {
    const { fetchCategories } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("createCategoryLoading")) return;
    setLoading("createCategoryLoading", true);
    client
      .post(adminApi.categories, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("دسته بندی جدید ثبت شد");
          fetchCategories();
          reset();
        }
      })
      .finally(() => setLoading("createCategoryLoading", false));
  },
  deleteCategory: (id) => {
    const { fetchCategories } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("deleteCategoryLoading")) return;
    setLoading("deleteCategoryLoading", true);
    client
      .delete(adminApi.categoryDetails(id))
      .then((res) => {
        if (res.status === 200) {
          toast.success("دسته بندی مورد نظر حذف شد");
          fetchCategories();
        }
      })
      .finally(() => setLoading("deleteCategoryLoading", false));
  },
  updateCategory: (id, data, setIsOpen = null) => {
    const { fetchCategories } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("updateCategoryLoading")) return;
    setLoading("updateCategoryLoading", true);
    client
      .put(adminApi.categoryDetails(id), data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("به روز رسانی انجام شد");
          fetchCategories();
          setIsOpen && setIsOpen(false);
        }
      })
      .finally(() => setLoading("updateCategoryLoading", false));
  },
}));

export default useCategoryStore;
