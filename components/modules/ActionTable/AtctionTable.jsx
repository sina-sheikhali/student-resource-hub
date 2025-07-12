import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";
import { Loader2Icon } from "lucide-react";

export default function ActionTable({
  deleteAction = true,
  editAction = true,
  resourceAction = false,
  statusAction = false,
  status,
  onDelete,
  onDeleteLoading,
  onStatusLoading,
  onChangeStatus,
  id,
  rowId,
  setRowId,
  setIsOpen,
  setIsOpenResourceModal,
  fetchDetails = false,
}) {
  const handleEdit = () => {
    setRowId(id);
    fetchDetails && fetchDetails(id);
    setIsOpen(true);
  };
  const handelResources = () => {
    setRowId(id);
    setIsOpenResourceModal(true);
  };

  return (
    <div className="flex gap-x-2">
      {resourceAction && (
        <button
          onClick={() => handelResources()}
          className="cursor-pointer rounded-md bg-amber-400 p-1.5"
        >
          <FolderPlusIcon className="h-4 w-4 text-white" />
        </button>
      )}
      {editAction && (
        <button
          onClick={() => handleEdit()}
          className="cursor-pointer rounded-md bg-blue-400 p-1.5"
        >
          <PencilIcon className="h-4 w-4 text-white" />
        </button>
      )}
      {deleteAction && (
        <button
          onClick={() => {
            setRowId(id);
            onDelete();
          }}
          className="cursor-pointer rounded-md bg-red-400 p-1.5"
        >
          {onDeleteLoading && rowId == id ? (
            <Loader2Icon className="h-4 w-4 animate-spin text-white" />
          ) : (
            <ArchiveBoxXMarkIcon className="h-4 w-4 text-white" />
          )}
        </button>
      )}
      {statusAction && (
        <button
          onClick={() => {
            setRowId(id);
            onChangeStatus();
          }}
          className={`cursor-pointer rounded-md ${status == "active" ? "bg-teal-400" : "bg-rose-400"} flex w-14 justify-center p-1.5 text-white`}
        >
          {onStatusLoading && rowId == id ? (
            <Loader2Icon className="h-4 w-4 animate-spin text-white" />
          ) : status == "active" ? (
            "فعال"
          ) : (
            "غیرفعال"
          )}
        </button>
      )}
    </div>
  );
}
