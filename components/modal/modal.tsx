"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import "./styles.css";
import { MutatingDots, TailSpin } from "react-loader-spinner";

type SpinnerType = "TailSpin" | "MutatingDots";

export type ModalHandle = {
  showModal: () => void;
  close: () => void;
};

type ModalProps = {
  spinner: SpinnerType;
  text: string;
};

const Modal = forwardRef<ModalHandle, ModalProps>(({ spinner, text }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-container">
        {spinner === "TailSpin" && (
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#004a5f"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        )}

        {spinner === "MutatingDots" && (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#004a5f"
            secondaryColor="#004a5f"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
          />
        )}
        <p className="modal-text" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;
