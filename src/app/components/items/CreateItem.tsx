/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import useNotfications from "@/app/hooks/useNotfications";
import React, { useContext, useEffect } from "react";

export default function CreateItem() {
  const { setPageName }: any = useContext(PageNameContext);
  const { NotficationComponent, HandelNotfication } = useNotfications();

  useEffect(() => {
    setPageName("Create Item");
  }, []);
  return (
    <div>
      <NotficationComponent />
    </div>
  );
}
