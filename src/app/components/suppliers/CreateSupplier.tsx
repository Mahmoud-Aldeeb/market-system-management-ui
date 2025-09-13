/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/createSupplier.scss";
import { PageNameContext } from "@/app/context/pageName";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Formik, ErrorMessage } from "formik";
import CustomField from "../common/CustomField";
import ErrorMessageP from "../common/ErrorMessage";
import * as Yup from "yup";
export default function CreateSupplier() {
  const { setPageName }: any = useContext(PageNameContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    setPageName("Create Supplier");
  }, [setPageName]);

  function handelSubmit(values: any) {
    axios
      .post(`${apiUrl}/supplier/add_supplier`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  }
  return (
    <div className="create-supplier">
      <Formik
        initialValues={{
          supplier_name: "",
          supplier_adress: "",
          phone: "",
          email: "",
        }}
        onSubmit={(values) => {
          handelSubmit(values);
        }}
        validationSchema={Yup.object({
          supplier_name: Yup.string().required("Supplier Name Required"),
          supplier_adress: Yup.string().required("Supplier Address Required"),
          phone: Yup.string()
            .required("Phone Required")
            .min(11, "Phone must be 11 digits"),
          email: Yup.string().required("Email Required").email("Invalid Email"),
        })}
      >
        <Form>
          <CustomField
            type={"text"}
            placeholder="Supplier Name"
            name="supplier_name"
          />
          <ErrorMessage name="supplier_name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            type={"text"}
            placeholder="Supplier Address"
            name="supplier_adress"
          />
          <ErrorMessage name="supplier_adress">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            type={"text"}
            placeholder="Supplier Email"
            name="email"
          />
          <ErrorMessage name="email">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            type={"text"}
            placeholder="Supplier Phone"
            name="phone"
          />
          <ErrorMessage name="phone">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <button type="submit">Add Supplier</button>
        </Form>
      </Formik>
    </div>
  );
}
