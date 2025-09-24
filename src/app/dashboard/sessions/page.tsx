import SessionHeadar from "@/app/components/sessions/SessionHeadar";
import Sessions from "@/app/components/sessions/Sessions";
import React from "react";
import "@/app/styles/sessions.scss";

export default function page() {
  return (
    <div className="sessions-page">
      <SessionHeadar />
      <Sessions />
    </div>
  );
}
