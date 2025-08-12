"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/app/styles/createNavTab.scss";
import React, { useContext, useEffect } from "react";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import { toast } from "react-toastify";
import CustomField from "../common/CustomField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";

export default function CreateNavTab() {
  const { setPageName }: any = useContext(PageNameContext);

  useEffect(() => {
    setPageName("Create Nav Tab");
  }, []);
  function handelSubmit(values: any) {
    axios
      .post("http://localhost:8090/nav/nav-tab", values)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => toast.error(err.response.data.message));
  }
  return (
    <div className="create-tab">
      <Formik
        initialValues={{ tab_name: "" }}
        onSubmit={(values) => handelSubmit(values)}
        validationSchema={Yup.object({
          tab_name: Yup.string().required("Tab Name Required"),
        })}
      >
        <Form>
          <CustomField type="text" placeholder="Tab Name" name="tab_name" />
          <ErrorMessage name="tab_name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <button type="submit">Create Nav Tab</button>
        </Form>
      </Formik>
    </div>
  );
}
