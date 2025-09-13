/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/editSupplier.scss";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomField from "../common/CustomField";
import ErrorMessageP from "../common/ErrorMessage";
export default function EditSupplier() {
  const { supplier } = useParams();
  const router = useRouter();
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
=======
>>>>>>> upstream/main

  const [supplierData, setSupplierData] = useState<{
    supplier_name: string;
    supplier_adress: string;
    phone: string;
    email: string;
  }>({ supplier_name: "", supplier_adress: "", phone: "", email: "" });
  function fetchSupplier() {
    axios
<<<<<<< HEAD
      .get(`${apiUrl}/supplier/supplier/${supplier}`, {
=======
      .get(`http://localhost:8090/supplier/supplier/${supplier}`, {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSupplierData(res.data.supplier);
      })
      .catch((err) => console.log(err));
  }
  function handelEditSupplier(values: any) {
    axios
<<<<<<< HEAD
      .put(`${apiUrl}/supplier/update_supplier/${supplier}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
=======
      .put(
        `http://localhost:8090/supplier/update_supplier/${supplier}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
>>>>>>> upstream/main
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          router.push("/dashboard/suppliers/allsupplier");
        }
      });
  }
  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <div className="edit-supplier">
      <Formik
        enableReinitialize
        initialValues={{
          supplier_name: supplierData.supplier_name,
          supplier_adress: supplierData.supplier_adress,
          phone: supplierData.phone,
          email: supplierData.email,
        }}
        onSubmit={(values) => {
          handelEditSupplier(values);
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
            id="supplier_name"
            name="supplier_name"
            placeholder="Supplier Name"
            type="text"
            value={supplierData.supplier_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSupplierData({
                ...supplierData,
                supplier_name: e.target.value,
              });
            }}
          />
          <ErrorMessage name="supplier_name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            id="supplier_adress"
            name="supplier_adress"
            placeholder="Supplier Adress"
            type="text"
            value={supplierData.supplier_adress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSupplierData({
                ...supplierData,
                supplier_adress: e.target.value,
              });
            }}
          />
          <ErrorMessage name="supplier_adress">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            id="supplier_email"
            name="supplier_email"
            placeholder="Supplier Email"
            type="text"
            value={supplierData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSupplierData({
                ...supplierData,
                email: e.target.value,
              });
            }}
          />
          <ErrorMessage name="email">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            id="supplier_Phone"
            name="supplier_Phone"
            placeholder="Supplier Phone"
            type="text"
            value={supplierData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSupplierData({
                ...supplierData,
                phone: e.target.value,
              });
            }}
          />
          <ErrorMessage name="phone">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
}
