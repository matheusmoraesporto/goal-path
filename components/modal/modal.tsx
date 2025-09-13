"use client";

import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import "./styles.css";

export type ModalHandle = {
  showModal: () => void;
  close: () => void;
};

type ModalProps = {
  children: ReactNode;
};

const Modal = forwardRef<ModalHandle, ModalProps>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-container">{children}</div>
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;
