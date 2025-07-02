"use client";

import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Button } from "@/components/ui/button";

export default function VideoPlayer() {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: "https://cdn.plyr.io/static/blank.mp4",
        type: "video/mp4",
      },
    ],
  };

  return (
    <div className="flex w-full flex-col gap-5 lg:flex-row-reverse">
      <div className="w-full overflow-hidden rounded-xl lg:w-1/2">
        <Plyr source={videoSrc} />
      </div>
      <div className="flex w-full flex-col gap-5 rounded-xl border bg-gray-50 p-5 shadow-md lg:w-1/2">
        <div>
          <p>
            دوره دیزاین پترن به شما کمک می‌کند کدهای خوانا و مقیاس‌پذیر بنویسید
            و با یادگیری الگوهای استاندارد، به یک برنامه نویس داناتر تبدیل شوید
            و شانس استخدام خود را افزایش دهید.
          </p>
        </div>
        <div className="mt-auto">
          <Button className={"bg-green-500 hover:bg-green-600/70"}>
            ثبت نام در دوره{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
