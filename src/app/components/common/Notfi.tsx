import React from "react";
import "@/app/styles/main.scss";

export default function Notfi({
  title,
  message,
  color,
}: {
  title: string;
  message: string;
  color?: string;
}) {
  return (
    <div className="notfi" style={{ backgroundColor: color }}>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}
