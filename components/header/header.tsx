import Image from "next/image";
import { GoSignOut } from "react-icons/go";
import { signOut } from "../../auth";
import "./styles.css";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="header-container centered-div">
        <Link href="/">
          <Image
            className="logo"
            src={"/logo-1.png"}
            alt="Goal Path - Your Roadmap to Success"
            width={180}
            height={90}
            priority
          />
        </Link>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="btn-signout" type="submit">
            <GoSignOut />
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
