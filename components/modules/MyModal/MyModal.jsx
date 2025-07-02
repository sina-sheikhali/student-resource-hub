import React from "react";
import Modal from "react-modal";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function ModalComponent({
  children,
  isOpen,
  closeModal,
  title,
  titleStyle,
}) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: "50",
      backdropFilter: "blur(0px)",
      animation: "blurEffect 0.2s ease-in-out forwards",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "18px",
      backgroundColor: "white",
      padding: "0",
      border: "none",
      minWidth: "20%",
      overflowY: "auto",
      maxHeight: "80vh",
      boxShadow: "0px 20px 50px 0px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative h-full w-full p-7 pt-12 pb-4">
          <div
            className={`${titleStyle} absolute -top-6 right-1/2 left-1/2 flex h-14 w-[40%] translate-x-1/2 items-end justify-center rounded-xl pb-1 text-white`}
          >
            <span className="">{title}</span>
          </div>
          <div className="absolute top-2 left-3">
            <XCircleIcon
              className="h-5 w-5 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          {children}
        </div>
      </Modal>
    </div>
  );
}
