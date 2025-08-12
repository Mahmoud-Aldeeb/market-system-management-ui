import { useRouter } from "next/navigation";
import HeaderComponent from "./HeaderComponent";
import Link from "next/link";

export default function TopNav({
  pageName = "Dashboard",
}: {
  pageName: string;
}) {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/");
  }
  return (
    <nav className="top-nav">
      <HeaderComponent headearName={`MSM ${pageName}`} />
      <div className="actions">
        <Link className="link" href="/dashboard/changepassword">
          Change Password
        </Link>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
