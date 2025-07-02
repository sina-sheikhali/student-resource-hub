import { create } from "zustand";
import { client } from "@/client/client";
import { userApi } from "@/api/user/api";
import useLoadingStore from "../common/useLoadingStore";
const useCourseStore = create((set, get) => ({
  mostWantedCourses: [],
  ratedCourses: [],
  newlyAddedCourses: [],
  courseDetails: {},

  setMostWantedCourses: (mostWantedCourses) => set({ mostWantedCourses }),
  setRatedCourses: (ratedCourses) => set({ ratedCourses }),
  setNewlyAddedCourses: (newlyAddedCourses) => set({ newlyAddedCourses }),
  setCourseDetails: (courseDetails) => set({ courseDetails }),

  fetchByFilter: async (type) => {
    const { setMostWantedCourses, setRatedCourses, setNewlyAddedCourses } =
      get();

    const { setLoading, isLoading } = useLoadingStore.getState();
    const loadingKey = `${type}Loading`;

    if (isLoading(loadingKey)) return;

    setLoading(loadingKey, true);

    try {
      const res = await client(userApi.fetchCourseByFilter + `/${type}`);

      switch (type) {
        case "mostwanted":
          setMostWantedCourses(res.data);
          break;
        case "ratedcourses":
          setRatedCourses(res.data);
          break;
        case "newlyaddedcourses":
          setNewlyAddedCourses(res.data);
          break;
        default:
          console.warn("Unknown filter type:", type);
      }
    } catch (error) {
      console.error(`Error fetching ${type} courses:`, error);
      // toast error if needed
    } finally {
      setLoading(loadingKey, false);
    }
  },

  fetchCourseDetails: (courseId) => {
    const { setCourseDetails } = get();

    client(userApi.fetchCourseDetails(courseId))
      .then((res) => setCourseDetails(res.data))
      .catch(() => {})
      .finally(() => {});
  },
}));

export default useCourseStore;
