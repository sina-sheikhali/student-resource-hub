import AtctionTable from "@/components/modules/ActionTable/AtctionTable";
import DataTable from "@/components/modules/DataTable/DataTable";
import useLoadingStore from "@/store/common/useLoadingStore";
import React, { useEffect, useState } from "react";
import EidtModal from "./EditModal";
import { closeModal } from "@/utils/modalUtils";
import ModalComponent from "@/components/modules/MyModal/MyModal";
import useCategoryStore from "@/store/admin/useCategoryStore";

export default function TableSection() {
  const isLoadingStore = useLoadingStore();
  const isDeleting = isLoadingStore.isLoading("deleteCategoryLoading");
  const isFetching = isLoadingStore.isLoading("fetchCategoriesLoading");
  const isChangeStatus = isLoadingStore.isLoading("updateCategoryLoading");

  const {
    fetchCategoryDetails,
    deleteCategory,
    updateCategory,
    fetchCategories,
    categories,
  } = useCategoryStore();

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
      accessorKey: "action",
      header: "عملیات",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <AtctionTable
            setIsOpen={setIsOpen}
            id={rowData.id}
            rowId={rowId}
            fetchDetails={fetchCategoryDetails}
            setRowId={setRowId}
            status={rowData.status}
            onDeleteLoading={isDeleting}
            onStatusLoading={isChangeStatus}
            onDelete={() => {
              deleteCategory(rowData.id);
            }}
            statusAction={true}
            onChangeStatus={() => {
              const newStatus =
                rowData.status == "active" ? "inactive" : "active";
              updateCategory(rowData.id, {
                status: newStatus,
              });
            }}
          />
        );
      },
    },
  ];
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <ModalComponent isOpen={isOpen} closeModal={() => closeModal(setIsOpen)}>
        {isOpen && <EidtModal rowId={rowId} setIsOpen={setIsOpen} />}
      </ModalComponent>
      <DataTable columns={columns} data={categories} loading={isFetching} />
    </div>
  );
}
