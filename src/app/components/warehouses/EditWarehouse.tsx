/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import "@/app/styles/editWarehouse.scss";
import ErrorMessageP from "../common/ErrorMessage";
import CustomField from "../common/CustomField";

interface warehouseType {
  warehouse_id?: number;
  warehouse_name?: string;
  location?: string | null;
  capacity?: string | null;
}

export default function EditWarehouse() {
  const router = useRouter();
  const { warehouse } = useParams();
  const [warehouseData, setWarehouseData] = useState<warehouseType>({});
  const { setPageName }: any = useContext(PageNameContext);
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
=======
>>>>>>> upstream/main

  useEffect(() => {
    setPageName("Edit Warehouse");
    axios
<<<<<<< HEAD
      .get(`${apiUrl}/warehouses/warehouse/${warehouse}`, {
=======
      .get(`http://localhost:8090/warehouses/warehouse/${warehouse}`, {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setWarehouseData(res.data.warehouse);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [warehouse]);

  function handleEditWarehouse(values: any) {
    axios
<<<<<<< HEAD
      .put(`${apiUrl}/warehouses/update_warehouse/${warehouse}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
=======
      .put(
        `http://localhost:8090/warehouses/update_warehouse/${warehouse}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
>>>>>>> upstream/main
      .then((res) => {
        toast.success(res.data.message);
        router.push("/dashboard/warehouses/allwarehouse");
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <div className="edit-warehouse">
      <Formik
        enableReinitialize
        initialValues={{
          warehouse_id: warehouseData.warehouse_id || "",
          warehouse_name: warehouseData.warehouse_name || "",
          location: warehouseData.location || "",
          capacity: warehouseData.capacity || "",
        }}
        onSubmit={(values) => {
          handleEditWarehouse(values);
        }}
        validationSchema={Yup.object({
          warehouse_name: Yup.string().required("Warehouse Name Required"),
          location: Yup.string().required("Warehouse Location Required"),
          capacity: Yup.number()
            .integer()
            .nullable()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            ),
        })}
      >
        {({ setFieldValue }) => (
          <Form>
            <CustomField
              type="text"
              name="warehouse_name"
              placeholder="Warehouse Name"
              value={warehouseData.warehouse_name || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setWarehouseData({
                  ...warehouseData,
                  warehouse_name: e.target.value,
                });
                setFieldValue("warehouse_name", e.target.value);
              }}
            />
            <ErrorMessage name="warehouse_name">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
            <CustomField
              type="text"
              name="location"
              placeholder="Location"
              value={warehouseData.location || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setWarehouseData({
                  ...warehouseData,
                  location: e.target.value,
                });
                setFieldValue("location", e.target.value);
              }}
            />
            <ErrorMessage name="location">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
            <CustomField
              type="text"
              name="capacity"
              placeholder="Capacity"
              value={warehouseData.capacity || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setWarehouseData({
                  ...warehouseData,
                  capacity: e.target.value,
                });
                setFieldValue("capacity", e.target.value);
              }}
            />
            <ErrorMessage name="capacity">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
            <button type="submit">Update Warehouse</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
