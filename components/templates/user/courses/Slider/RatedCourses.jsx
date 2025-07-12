"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// import required modules
import { Navigation } from "swiper/modules";
import Card from "@/components/modules/Card/Card";
import useCourseStore from "@/store/user/useCourseStore";
import { useEffect } from "react";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import Skeleton from "@/components/modules/Skeleton/Skeleton";
import useLoadingStore from "@/store/common/useLoadingStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function RatedCourses() {
  const { ratedCourses, fetchByFilter } = useCourseStore();
  const isLoading = useLoadingStore((state) =>
    state.isLoading("mostwantedLoading"),
  );

  useEffect(() => {
    fetchByFilter("ratedcourses");
  }, []);

  return (
    <div className="">
      <div className="mb-5">
        <SectionTitle text={"محبوب ترین ها"} color="bg-yellow-500" />
      </div>
      <div className="rounded-sm bg-gray-50 p-3">
        <Swiper
          slidesPerView={4}
          spaceBetween={5}
          loop={true}
          modules={[Navigation]}
          navigation={{
            enabled: true,
            nextEl: ".swiper-button-rated-next-custom-1",
            prevEl: ".swiper-button-rated-prev-custom-1",
            disabledClass: "swiper-button-disabled",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {isLoading ? (
            <Skeleton />
          ) :  ratedCourses?.length > 0 ? (
            ratedCourses.map((item) => (
              <SwiperSlide key={item.id} className="!p-2">
                <Card  {...item} slug={item.id} />
              </SwiperSlide>
            ))
          ) : (
            <div className="flex h-full min-h-[346px] w-full items-center justify-center">
              <p className="text-center text-gray-500">دوره‌ای یافت نشد.</p>
            </div>
          )}

          <button className="swiper-button-rated-next-custom-1 text-primaryGray1 absolute top-[-50%] bottom-[-50%] -left-4 z-20 cursor-pointer px-5">
            <ChevronLeft className="h-7 w-7 rounded-full bg-cyan-500 p-1 text-white hover:bg-cyan-500/85 md:h-9 md:w-9" />
          </button>
          <button className="swiper-button-rated-prev-custom-1 text-primaryGray1 absolute top-[-50%] -right-4 bottom-[-50%] z-20 cursor-pointer px-5">
            <ChevronRight className="h-7 w-7 rounded-full bg-cyan-500 p-1 text-white hover:bg-cyan-500/85 md:h-9 md:w-9" />
          </button>
        </Swiper>
      </div>
    </div>
  );
}
