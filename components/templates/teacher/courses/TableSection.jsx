import AtctionTable from "@/components/modules/ActionTable/AtctionTable";
import DataTable from "@/components/modules/DataTable/DataTable";
import useCourseStore from "@/store/admin/useCourseStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import React, { useEffect, useState } from "react";
import EidtModal from "./EidtModal";
import { closeModal } from "@/utils/modalUtils";
import ModalComponent from "@/components/modules/MyModal/MyModal";

export default function TableSection() {
  const {
    fetchCourses,
    fetchCourse,
    courses,
    deleteCourse,
    updateCourse,
  } = useCourseStore();
  const isLoadingStore = useLoadingStore();
  const isFetching = isLoadingStore.isLoading("fetchCoursesLoading");
  const isDeleting = isLoadingStore.isLoading("deleteCourseLoading");
  const isChangeStatus = isLoadingStore.isLoading("updateCourseLoading");
  const [rowId, setRowId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      accessorKey: "id",
      header: "آیدی",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "description",
      header: "توضیحات",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "action",
      header: "عملیات",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <AtctionTable
            setIsOpen={setIsOpen}
            id={rowData.id}
            rowId={rowId}
            fetchDetails={fetchCourse}
            setRowId={setRowId}
            status={rowData.status}
            onDeleteLoading={isDeleting}
            onStatusLoading={isChangeStatus}
            onDelete={() => {
              deleteCourse(rowData.id);
            }}
            onChangeStatus={() => {
              const newStatus =
                rowData.status == "active" ? "inactive" : "active";
              updateCourse(rowData.id, {
                status: newStatus,
              });
            }}
            statusAction={true}
          />
        );
      },
    },
  ];
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <ModalComponent isOpen={isOpen} closeModal={() => closeModal(setIsOpen)}>
        {isOpen && <EidtModal rowId={rowId} setIsOpen={setIsOpen} />}
      </ModalComponent>
      <DataTable columns={columns} data={courses} loading={isFetching} />
    </div>
  );
}
