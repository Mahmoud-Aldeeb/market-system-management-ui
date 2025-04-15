/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import React, { useEffect, useContext } from "react";

export default function CreateSupplier() {
  const { setPageName }: any = useContext(PageNameContext);
  useEffect(() => {
    setPageName("Create Supplier");
  }, [setPageName]);
  return <div>CreateSupplier</div>;
}
