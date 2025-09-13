"use client";

import { createUser, FormUserState } from "@/service/actions/users";
import "./styles.css";
import { useActionState, useEffect, useRef } from "react";
import Modal, { ModalHandle } from "@/components/modal/modal";

export default function SignUpPage() {
  const initialState: FormUserState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createUser as (
      prevState: FormUserState | undefined,
      formData: FormData
    ) => Promise<FormUserState | undefined>,
    initialState
  );

  const modalRef = useRef<ModalHandle>(null);
  useEffect(() => {
    if (isPending) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isPending]);

  return (
    <>
      <div className="signup-page-container centered-div">
        <form action={formAction}>
          <div className="input-form">
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              defaultValue={state?.values?.name ?? ""}
            />
          </div>

          <div className="input-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>

          <div className="input-form">
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              defaultValue={state?.values?.password ?? ""}
            />
          </div>

          <div className="input-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.password &&
              state.errors.password.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>

          <button className="btn-submit-signup btn-primary" type="submit">
            Cadastrar
          </button>
        </form>
      </div>

      <Modal ref={modalRef} spinner="TailSpin" text="Criando usuário..." />
    </>
  );
}
