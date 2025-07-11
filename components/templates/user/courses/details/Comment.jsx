"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Reply } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import jalali from "jalali-dayjs";
import useCourseDetailsStore from "@/store/user/useCourseDetailsStore";
import useLoadingStore from "@/store/common/useLoadingStore";

export default function Comments({ courseId }) {
  const [createCommentBox, setCreateCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);

  const { createComment, fetchComments, comments } = useCourseDetailsStore();

  const isLoadingStore = useLoadingStore();
  const fetchCommentsLoading = isLoadingStore.isLoading("fetchCommentsLoading");
  const createCommentLoading = isLoadingStore.isLoading("createCommentLoading");

  dayjs.extend(jalali);

  // focus input
  useEffect(() => {
    if (createCommentBox && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [createCommentBox]);

  useEffect(() => {
    fetchComments(courseId);
  }, []);

  const handleOpenCommentBox = () => {
    setCreateCommentBox(true);
  };

  const handleSubmitComment = () => {
    if (comment) {
      createComment(
        { course_id: courseId, comment },
        setComment,
        setCreateCommentBox,
      );
    }
  };
  return (
    <div className="rounded-md bg-gray-50 p-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold">نظرات کاربران</h3>
        <Button
          className={"bg-green-400 transition-colors hover:bg-green-600/70"}
          onClick={handleOpenCommentBox}
        >
          ایجاد نظر جدید
        </Button>
      </div>

      <div className="my-8 flex flex-col gap-5">
        <AnimatePresence>
          {createCommentBox && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5"
            >
              <textarea
                className="w-full rounded-sm bg-slate-400 p-4 text-white placeholder:text-white"
                rows={5}
                placeholder="نظر خود را بنویسید ..."
                ref={textareaRef}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
              <div className="flex flex-row-reverse gap-x-3">
                <Button
                  className={
                    "border border-green-400 bg-green-400 transition-colors hover:bg-transparent hover:text-green-400"
                  }
                  onClick={handleSubmitComment}
                >
                  {createCommentLoading ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  ) : (
                    "ارسال"
                  )}
                </Button>
                <Button
                  className={
                    "border border-green-400 bg-transparent text-green-400 transition-colors hover:bg-green-400 hover:text-white"
                  }
                  onClick={() => {
                    setComment("");
                    setCreateCommentBox(false);
                  }}
                >
                  لغو
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {!fetchCommentsLoading ? (
          comments.length > 0 ? (
            comments.map((comment) => (
              <div
                className="flex flex-col gap-5 rounded-md bg-gray-200 p-5"
                key={comment.id}
              >
                <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-x-1 text-gray-800">
                      <span>سینا شیخ علی</span>
                      <span className="font-bold">|</span>
                      <span className="font-bold">مدرس</span>
                    </div>
                    <div>
                      <span className="text-sm tracking-tighter text-gray-500">
                        {dayjs(comment.created_at)
                          .locale("fa")
                          .format("YYYY/MM/DD")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button
                      className={
                        "border border-sky-400 bg-transparent text-sky-400 transition-colors hover:bg-sky-400 hover:text-white"
                      }
                    >
                      <Reply className="h-12 w-12" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="whitespace-pre-line">{comment.comment}</p>
                </div>
                {/* <div className="flex flex-col gap-5 rounded-md bg-gray-300 p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-400 pb-5">
              <div className="flex items-center gap-x-1 text-gray-800">
                <span>سینا شیخ علی</span>
                <span className="font-bold">|</span>
                <span className="font-bold">مدرس</span>
              </div>
            </div>
            <div>
              <p>کامنت</p>
            </div>
          </div> */}
              </div>
            ))
          ) : (
            <div className="flex h-24 items-center justify-center">
              <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
