"use client";

import { authenticate } from "../../service/actions/users";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import "./styles.css";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="login-page-container centered-div">
      <form action={formAction}>
        <div className="input-form">
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            defaultValue={state?.values?.name ?? ""}
          />
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
          {state?.error && state?.error.length > 0 && <p>{state.error}</p>}
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          className="btn-submit-login btn-primary"
          type="submit"
          disabled={isPending}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
