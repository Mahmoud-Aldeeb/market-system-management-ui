"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/app/styles/createDepartment.scss";
import React, { useContext, useEffect } from "react";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import { toast } from "react-toastify";
import CustomField from "../common/CustomField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";
export default function CreateDepartment() {
  const { setPageName }: any = useContext(PageNameContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setPageName("Create Department");
  }, [setPageName]);

  function hundelSubmit(values: any) {
    axios
      .post(`${apiUrl}/users/create_dep`, values)
      .then((res) => {
        if (res.data.message == "Department created successfully") {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="create-dep">
      <Formik
        initialValues={{ depName: "", depDesc: "" }}
        onSubmit={(values) => {
          hundelSubmit(values);
        }}
        validationSchema={Yup.object({
          depName: Yup.string().required("Department Name Required"),
          depDesc: Yup.string().required("Department Description Required"),
        })}
      >
        <Form>
          <div className="create-dep-div">
            <CustomField
              type="text"
              placeholder="Department Name"
              name="depName"
            />
            <ErrorMessage name="depName">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-dep-div">
            <CustomField
              type="text"
              placeholder="Department Description "
              name="depDesc"
            />
            <ErrorMessage name="depDesc">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-dep-div">
            <button type="submit">Create Department</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
