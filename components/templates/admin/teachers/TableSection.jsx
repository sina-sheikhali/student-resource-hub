import AtctionTable from "@/components/modules/ActionTable/AtctionTable";
import DataTable from "@/components/modules/DataTable/DataTable";
import useLoadingStore from "@/store/common/useLoadingStore";
import React, { useEffect, useState } from "react";
import EidtModal from "./EditModal";
import { closeModal } from "@/utils/modalUtils";
import ModalComponent from "@/components/modules/MyModal/MyModal";
import useCollegeStore from "@/store/admin/useCollegeStore";

export default function TableSection() {
  const isLoadingStore = useLoadingStore();
  const isDeleting = isLoadingStore.isLoading("deleteCollegeLoading");
  const isFetching = isLoadingStore.isLoading("fetchCollegesLoading");
  const { fetchCollegeDetails, deleteCollege, fetchAllColleges, colleges } =
    useCollegeStore();

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
      accessorKey: "rank",
      header: "رتبه",
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
            fetchDetails={fetchCollegeDetails}
            setRowId={setRowId}
            status={rowData.status}
            onDeleteLoading={isDeleting}
            onDelete={() => {
              deleteCollege(rowData.id);
            }}
          />
        );
      },
    },
  ];
  useEffect(() => {
    fetchAllColleges();
  }, []);

  return (
    <div>
      <ModalComponent isOpen={isOpen} closeModal={() => closeModal(setIsOpen)}>
        {isOpen && <EidtModal rowId={rowId} setIsOpen={setIsOpen} />}
      </ModalComponent>
      <DataTable columns={columns} data={colleges} loading={isFetching} />
    </div>
  );
}
