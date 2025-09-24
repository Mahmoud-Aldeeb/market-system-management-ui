/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/createItem.scss";
import { PageNameContext } from "@/app/context/pageName";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Formik, ErrorMessage } from "formik";
import CustomField from "../common/CustomField";
import ErrorMessageP from "../common/ErrorMessage";
import * as Yup from "yup";

export default function CreateItem() {
  const { setPageName }: any = useContext(PageNameContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [itemCode, setItemCode] = useState<string>(
    Math.ceil(Math.random() * 200000).toString()
  );

  useEffect(() => {
    setPageName("Add New Item");
    // Fetch suppliers for dropdown
    axios
      .get(`${apiUrl}/supplier/suppliers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSuppliers(res.data.suppliers || []);
      })
      .catch((err) => toast.error("Failed to fetch suppliers"));
  }, [setPageName]);

  function handleSubmit(values: any, { resetForm }: any) {
    const formattedValues = {
      ...values,
      purchase_price: values.purchase_price || null,
      unit_price: values.unit_price || null,
      description: values.description || null,
      valid_date: values.valid_date || null,
      expiry_date: values.expiry_date || null,
    };

    console.log("Sending data to backend:", formattedValues); // Debug log

    axios
      .post(`${apiUrl}/items/add_item`, formattedValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        // Increment item_code by 1
        const nextItemCode = (parseInt(values.item_code) + 1).toString();
        setItemCode(nextItemCode);
        // Reset form with new item_code and clear other fields
        resetForm({
          values: {
            item_code: nextItemCode,
            item_name: "",
            supplier_id: "",
            description: "",
            purchase_price: "",
            valid_date: "",
            expiry_date: "",
            unit_price: "",
          },
        });
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Failed to add item")
      );
  }

  return (
    <div className="create-item">
      <Formik
        initialValues={{
          item_code: itemCode,
          item_name: "",
          supplier_id: "",
          description: "",
          purchase_price: "",
          valid_date: "",
          expiry_date: "",
          unit_price: "",
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          item_code: Yup.string().required("Item code is required"),
          item_name: Yup.string().required("Item name is required"),
          supplier_id: Yup.string().required("Supplier is required"),
          unit_price: Yup.number()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .nullable()
            .positive("Must be a positive number"),
          description: Yup.string().nullable(),
          valid_date: Yup.date()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .nullable(),
          expiry_date: Yup.date()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .nullable()
            .min(Yup.ref("valid_date"), "Expiry date must be after valid date"),
          purchase_price: Yup.number()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .nullable()
            .positive("Must be a positive number"),
        })}
      >
        <Form>
          <div className="form-field">
            <label htmlFor="item_code">Item Code</label>
            <CustomField
              type="text"
              placeholder="كود الصنف"
              name="item_code"
              id="item_code"
            />
            <ErrorMessage name="item_code">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="item_name">Item Name</label>
            <CustomField
              type="text"
              placeholder="اسم الصنف"
              name="item_name"
              id="item_name"
            />
            <ErrorMessage name="item_name">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="supplier_id">Supplier</label>
            <CustomField
              list="supplier"
              type="text"
              name="supplier_id"
              placeholder="اختر المورد"
              id="supplier_id"
            />
            <datalist id="supplier">
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplier_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No suppliers available
                </option>
              )}
            </datalist>
            <ErrorMessage name="supplier_id">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="unit_price">Unit Price</label>
            <CustomField
              name="unit_price"
              type="number"
              placeholder="سعر الوحدة"
              id="unit_price"
            />
            <ErrorMessage name="unit_price">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <CustomField
              type="textarea"
              placeholder="الوصف"
              name="description"
              id="description"
            />
            <ErrorMessage name="description">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="purchase_price">Purchase Price</label>
            <CustomField
              type="number"
              placeholder="سعر الشراء"
              name="purchase_price"
              id="purchase_price"
            />
            <ErrorMessage name="purchase_price">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="valid_date">Valid From Date</label>
            <CustomField
              type="date"
              placeholder="تاريخ الصلاحية من"
              name="valid_date"
              id="valid_date"
            />
            <ErrorMessage name="valid_date">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-field">
            <label htmlFor="expiry_date">Expiry Date</label>
            <CustomField
              type="date"
              placeholder="تاريخ انتهاء الصلاحية"
              name="expiry_date"
              id="expiry_date"
            />
            <ErrorMessage name="expiry_date">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <button type="submit">Add Item</button>
        </Form>
      </Formik>
    </div>
  );
}
