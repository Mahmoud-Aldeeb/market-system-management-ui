/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect } from "react";
export default function CreateUsers() {
  const { setPageName }: any = useContext(PageNameContext);
  useEffect(() => {
    setPageName("Create Users");
  }, [setPageName]);
  return <div>CreateUsers</div>;
}
