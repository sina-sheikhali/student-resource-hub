import { create } from "zustand";
import { client } from "@/client/client";
import { userApi } from "@/api/user/api";
import useLoadingStore from "../common/useLoadingStore";
const useCourseStore = create((set, get) => ({
  mostWantedCourses: [],
  ratedCourses: [],
  newlyAddedCourses: [],
  courseDetails: {},
  myCourses: [],
  searchResult: [],

  setMostWantedCourses: (mostWantedCourses) => set({ mostWantedCourses }),
  setRatedCourses: (ratedCourses) => set({ ratedCourses }),
  setNewlyAddedCourses: (newlyAddedCourses) => set({ newlyAddedCourses }),
  setCourseDetails: (courseDetails) => set({ courseDetails }),
  setMyCourses: (myCourses) => set({ myCourses }),
  setSearchResult: (searchResult) => set({ searchResult }),

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
    } finally {
      setLoading(loadingKey, false);
    }
  },

  fetchCourseDetails: (courseId) => {
    const { setCourseDetails } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchCourseDetails")) return;
    setLoading("fetchCourseDetails", true);

    client(userApi.fetchCourseDetails(courseId))
      .then((res) => {
        setCourseDetails(res.data.data);
      })
      .finally(() => setLoading("fetchCourseDetails", false));
  },
  fetchMyCourse: () => {
    const { setMyCourses } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("fetchMyCoursesLoading")) return;
    setLoading("fetchMyCoursesLoading", true);

    client(userApi.fetchMyCourses)
      .then((res) => {
        setMyCourses(res.data.data);
      })
      .finally(() => setLoading("fetchMyCoursesLoading", false));
  },
  serachCourse: (value) => {
    const { setSearchResult } = get();
    const { setLoading, isLoading } = useLoadingStore.getState();
    if (isLoading("searchCourseLoading")) return;
    setLoading("searchCourseLoading", true);

    client(userApi.searchCourse(value))
      .then((res) => {
        setSearchResult(res.data.data);
      })
      .finally(() => setLoading("searchCourseLoading", false));
  },
}));

export default useCourseStore;
