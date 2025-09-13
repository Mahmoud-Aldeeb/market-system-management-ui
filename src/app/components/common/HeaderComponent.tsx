import React from "react";
import "@/app/styles/main.scss";

export default function HeaderComponent({
  headearName,
}: {
  headearName: string;
}) {
  return <h1 className="header">{headearName}</h1>;
}
