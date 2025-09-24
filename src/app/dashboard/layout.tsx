"use client";
import { useState } from "react";
import SideNav from "../components/common/SideNav";
import TopNav from "../components/common/TopNav";
import "@/app/styles/dashboard.scss";
import "@/app/styles/nav.scss";
import { PageNameContext } from "../context/pageName";

export default function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pageName, setPageName] = useState("Dashboard");
  return (
    <main>
      <PageNameContext.Provider value={{ pageName, setPageName }}>
        <section>
          <SideNav />
        </section>
        <section className="dashboard">
          <TopNav pageName={pageName} />
          <div className="dashboard-content">{children}</div>
        </section>
      </PageNameContext.Provider>
    </main>
  );
}
