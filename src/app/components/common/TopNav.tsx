import HeaderComponent from "./HeaderComponent";

export default function TopNav({
  pageName = "Dashboard",
}: {
  pageName: string;
}) {
  return (
    <nav className="top-nav">
      <HeaderComponent headearName={`MSM ${pageName}`} />
      <button>Logout</button>
    </nav>
  );
}
