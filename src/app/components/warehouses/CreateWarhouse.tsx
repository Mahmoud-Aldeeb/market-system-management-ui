/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useEffect } from "react";
import "@/app/styles/createWarehouses.scss";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorMessage, Form, Formik } from "formik";
import CustomField from "../common/CustomField";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";
export default function CreateWarhouse() {
  const { setPageName }: any = useContext(PageNameContext);

  useEffect(() => {
    setPageName("Create Warehouse");
  }, []);
  function handelCreateWarehouse(values: {
    warehouse_name: string;
    location: string;
    capacity: string;
  }) {
    axios
      .post("http://localhost:8090/warehouses/add_warehouse", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  }
  return (
    <div className="create-warehouse">
      <Formik
        initialValues={{ warehouse_name: "", location: "", capacity: "" }}
        validationSchema={Yup.object({
          warehouse_name: Yup.string().required("Warehouse Name Required"),
          location: Yup.string().required("Warehouse Location Required"),
          capacity: Yup.number().integer(),
        })}
        onSubmit={(values) => {
          handelCreateWarehouse(values);
        }}
      >
        <Form>
          <CustomField
            name="warehouse_name"
            type="text"
            placeholder="Warehouse Name"
          />
          <ErrorMessage name="warehouse_name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>

          <CustomField name="location" type="text" placeholder="Location" />
          <ErrorMessage name="location">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField name="capacity" type="text" placeholder="Capacity" />
          <ErrorMessage name="capacity">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <button type="submit">Create Warehouse</button>
        </Form>
      </Formik>
    </div>
  );
}
