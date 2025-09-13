"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/app/styles/createBranch.scss";
import { PageNameContext } from "@/app/context/pageName";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import CustomField from "../common/CustomField";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ErrorMessageP from "../common/ErrorMessage";
<<<<<<< HEAD
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
=======
>>>>>>> upstream/main
export default function CreateBranch() {
  const { setPageName }: any = useContext(PageNameContext);
  useEffect(() => {
    setPageName("Create Branch");
  }, []);
  return (
    <div className="create-branch">
      <Formik
        initialValues={{
          branch_name: "",
          location: "",
          branch_type: "Sub",
          is_main_branch: false,
        }}
        onSubmit={(values) => {
          const token = localStorage.getItem("token");
          axios
            .post(
<<<<<<< HEAD
              `${apiUrl}/branch/branches`,
=======
              "http://localhost:8090/branch/branches",
>>>>>>> upstream/main
              {
                branch_name: values.branch_name,
                location: values.location,
                branch_type: values.branch_type,
                is_main_branch: values.is_main_branch ? 1 : 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              toast.success(res.data.message);
            })
            .catch((err) => toast.error(err.response.data.message));
        }}
        validationSchema={Yup.object({
          branch_name: Yup.string().required("Branch Name Required"),
          location: Yup.string().required("Location Required"),
          branch_type: Yup.string().required("Branch Type Required"),
        })}
      >
        {({ handleChange }) => (
          <Form>
            <CustomField
              name="branch_name"
              type="text"
              placeholder="Branch Name"
            />
            <ErrorMessage name="branch_name">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
            <CustomField name="location" type="text" placeholder="Location" />
            <ErrorMessage name="location">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
            <select
              className="branch-type"
              onChange={handleChange}
              name="branch_type"
              id="branch_type"
            >
              <option value="Sub">Sub</option>
              <option value="Regional">Regional</option>
              <option value="Major">Major</option>
            </select>
            <ErrorMessage name="branch_type">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
            <label>
              <Field
                className="is-main-branch"
                type="checkbox"
                name="is_main_branch"
              />
              Is Main Branch
            </label>
            <button type="submit">Create</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
