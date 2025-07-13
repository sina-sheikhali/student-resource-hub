import AtctionTable from "@/components/modules/ActionTable/AtctionTable";
import DataTable from "@/components/modules/DataTable/DataTable";
import useLoadingStore from "@/store/common/useLoadingStore";
import React, { useEffect, useState } from "react";
import EidtModal from "./EditModal";
import { closeModal } from "@/utils/modalUtils";
import ModalComponent from "@/components/modules/MyModal/MyModal";
import useTeacherStore from "@/store/admin/useTeacherStore";

export default function TableSection() {
  const isLoadingStore = useLoadingStore();
  const isDeleting = isLoadingStore.isLoading("deleteCollegeLoading");
  const isFetching = isLoadingStore.isLoading("fetchCollegesLoading");
  const { fetchTeachers, fetchTeacherDetails, deleteTeachers, teachers } =
    useTeacherStore();

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
      accessorKey: "phone",
      header: "شماره همراه",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "ایمیل",
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
            fetchDetails={fetchTeacherDetails}
            setRowId={setRowId}
            status={rowData.status}
            onDeleteLoading={isDeleting}
            onDelete={() => {
              deleteTeachers(rowData.id);
            }}
          />
        );
      },
    },
  ];
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div>
      <ModalComponent isOpen={isOpen} closeModal={() => closeModal(setIsOpen)}>
        {isOpen && <EidtModal rowId={rowId} setIsOpen={setIsOpen} />}
      </ModalComponent>
      <DataTable columns={columns} data={teachers} loading={isFetching} />
    </div>
  );
}
