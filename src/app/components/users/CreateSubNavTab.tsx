"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/app/styles/createSubNavTab.scss";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomField from "../common/CustomField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";

export default function CreateSubNavTab() {
  const { setPageName }: any = useContext(PageNameContext);

  const [tabs_name, set_tabs_name] =
    useState<{ tab_name: string; tab_id: number }[]>();
  useEffect(() => {
    setPageName("Create Sub Nav Tab");
    axios.get("http://localhost:8090/nav/nav-tab").then((res) => {
      console.log(res.data);
      set_tabs_name(res.data.nav_tab);
    });
  }, []);
  function handelSubmit(values: any) {
    axios
      .post("http://localhost:8090/nav/nav-sub-tab", values)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => toast.error(err.response.data.message));
  }
  return (
    <div className="create-sub-nav">
      <Formik
        initialValues={{ name: "", tab_name: "", href: "" }}
        onSubmit={(values) => handelSubmit(values)}
        validationSchema={Yup.object({
          name: Yup.string().required("Name Required"),
          tab_name: Yup.string().required("Group Name Required"),
          href: Yup.string().required("href Required"),
        })}
      >
        <Form>
          <CustomField type="text" placeholder="Name" name="name" />
          <ErrorMessage name="name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            type="text"
            placeholder="Group Name"
            list="tabs-name"
            name="tab_name"
          />
          <datalist id="tabs-name">
            {tabs_name?.map((tab: any) => (
              <option key={tab.tab_id} value={tab.tab_name} />
            ))}
          </datalist>
          <ErrorMessage name="tab_name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField type="text" placeholder="href" name="href" />
          <ErrorMessage name="href">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <button type="submit">Create Sub Nav Tab</button>
        </Form>
      </Formik>
    </div>
  );
}
