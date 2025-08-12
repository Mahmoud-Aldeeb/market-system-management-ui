import React from "react";
import "@/app/styles/main.scss";

export default function ErrorMessageP({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="error-message">{children}</p>;
}
