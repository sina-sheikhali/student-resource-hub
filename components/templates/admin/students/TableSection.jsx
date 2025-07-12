import AtctionTable from "@/components/modules/ActionTable/AtctionTable";
import DataTable from "@/components/modules/DataTable/DataTable";
import useLoadingStore from "@/store/common/useLoadingStore";
import React, { useEffect, useState } from "react";
import EidtModal from "./EditModal";
import { closeModal } from "@/utils/modalUtils";
import ModalComponent from "@/components/modules/MyModal/MyModal";
import useUserStore from "@/store/admin/useUsersStore";

export default function TableSection() {
  const isLoadingStore = useLoadingStore();
  const isFetching = isLoadingStore.isLoading("fetchUsersLoading");
  const { fetchAllUsers, users } = useUserStore();

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
      header: "نام کاربری",
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
            deleteAction={false}
            setRowId={setRowId}
            status={rowData.status}
            onDeleteLoading={false}
          />
        );
      },
    },
  ];
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <ModalComponent isOpen={isOpen} closeModal={() => closeModal(setIsOpen)}>
        {isOpen && (
          <EidtModal rowId={rowId} data={users} setIsOpen={setIsOpen} />
        )}
      </ModalComponent>
      <DataTable columns={columns} data={users} loading={isFetching} />
    </div>
  );
}
