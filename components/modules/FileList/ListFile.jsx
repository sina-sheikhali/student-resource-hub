import { Input } from "@/components/ui/input";
import useResourceStore from "@/store/admin/useRecourceStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Loader2Icon } from "lucide-react";
import { XCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

export default function ListFile({ title, condition, rowId }) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const [mainResource, setMainResource] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const { resourcesCourse, deleteResources } = useResourceStore();
  const isLoadingStore = useLoadingStore();

  const { updateRecources } = useResourceStore();
  const fetchResourcesCourseLoading = isLoadingStore.isLoading(
    "fetchResourcesCourseLoading",
  );

  const handleDelete = (id) => {
    deleteResources(id, rowId);
  };

  const handleEdit = (item) => {
    setMainResource(item.id);
    setNewTitle(item.title);
    setShowInput(true);
  };

  const handleChangeInput = (e) => {
    setNewTitle(e.target.value);
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput, mainResource]);

  return (
    <div className="col-span-1">
      <h3 className="mb-4 text-lg font-semibold md:text-xl">{title}</h3>
      <div className="h-[210px] w-full overflow-y-scroll rounded-md border-2 p-3">
        {!fetchResourcesCourseLoading ? (
          (() => {
            let items;
            if (condition === "1") {
              items = resourcesCourse.filter((item) => item.type === "video");
            } else {
              items = resourcesCourse.filter((item) => item.type !== "video");
            }

            return items.length > 0 ? (
              <ol className="space-y-1.5 text-sm md:text-base">
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-gray-200 py-2 last:border-b-0"
                  >
                    <div className="flex flex-1 items-center gap-2 overflow-hidden">
                      <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-900 text-gray-100">
                        {index + 1}
                      </span>

                      {showInput && mainResource === item.id ? (
                        <Input
                          dir="rtl"
                          ref={inputRef}
                          className="h-[25px] w-full"
                          value={newTitle}
                          onChange={handleChangeInput}
                        />
                      ) : (
                        <span
                          className="overflow-hidden pr-0.5 text-sm font-semibold text-ellipsis whitespace-nowrap text-gray-600 md:text-base"
                          dir="ltr"
                        >
                          {item.title}
                          {condition === "2" && `.${item.type}`}
                        </span>
                      )}
                    </div>

                    {showInput && mainResource === item.id ? (
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => {
                            updateRecources(item.id, rowId, {
                              title: newTitle,
                            });
                            setMainResource("");
                            setShowInput("");
                          }}
                          className="rounded-sm bg-green-400 text-sm hover:underline"
                        >
                          <CheckIcon className="h-6 w-6 cursor-pointer p-0.5 text-white" />
                        </button>
                        <button
                          onClick={() => setShowInput(false)}
                          className="rounded-sm bg-rose-400 text-sm hover:underline"
                        >
                          <XCircleIcon className="h-6 w-6 cursor-pointer p-0.5 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-sm bg-blue-400 text-sm hover:underline"
                        >
                          <PencilIcon className="h-6 w-6 cursor-pointer p-1 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-sm bg-rose-400 text-sm hover:underline"
                        >
                          <ArchiveBoxXMarkIcon className="h-6 w-6 cursor-pointer p-1 text-white" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <div className="flex h-full items-center justify-center text-lg">
                <p>موردی یافت نشد!</p>
              </div>
            );
          })()
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
          </div>
        )}
      </div>
    </div>
  );
}
