import { signOut } from "../../auth";
import "./styles.css";

export default function Header() {
  return (
    <header>
      <div className="header-container centered-div">
        <h1>Goal Path</h1>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="btn-secondary" type="submit">
            {/* <PowerIcon className="w-6" /> */}
            <div>Sign Out</div>
          </button>
        </form>
      </div>
    </header>
  );
}
