"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, ErrorMessage, Field } from "formik";
import ErrorMessageP from "../common/ErrorMessage";

import * as Yup from "yup";
import CustomField from "../common/CustomField";
import "@/app/styles/EditItem.scss";

interface Item {
  item_id: string;
  item_code: string;
  item_name: string;
  supplier_id: string;
  unit_price: number;
  description: string;
  valid_from_date: string;
  exp_date: string;
  purchase_price: number;
}

const EditItem = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to format date for input type="date"
  const formatDateForInput = (dateStr: string | null) => {
    if (!dateStr) return "";
    // Extract YYYY-MM-DD from YYYY-MM-DD HH:MM:SS
    return dateStr.split("T")[0];
  };

  // Fetch item data
  function getData() {
    axios
      .get(`${apiUrl}/items/get_item/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const obj = {
            created_date: res.data.data.created_date,
            description: res.data.data.description,
            exp_date: formatDateForInput(res.data.data.exp_date),
            item_code: res.data.data.item_code,
            item_id: res.data.data.item_id,
            item_name: res.data.data.item_name,
            purchase_price: res.data.data.purchase_price,
            supplier_id: res.data.data.supplier_id,
            unit_price: res.data.data.unit_price,
            valid_from_date: formatDateForInput(res.data.data.valid_from_date),
          };
          console.log("Fetched item data from API:", res.data.data); // Full API response
          console.log("Formatted item data for state:", obj); // Formatted data
          setItem(obj);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching item:", err);
        toast.error("Failed to fetch item data");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [id]); // Add id to dependency array to refetch if id changes

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    item_code: Yup.string().required("Item Code is required"),
    item_name: Yup.string().required("Item Name is required"),
    supplier_id: Yup.string().required("Supplier ID is required"),
    unit_price: Yup.number()
      .required("Unit Price is required")
      .min(0, "Unit Price must be positive"),
    description: Yup.string(),
    valid_from_date: Yup.date().nullable(),
    exp_date: Yup.date().nullable(),
    purchase_price: Yup.number()
      .min(0, "Purchase Price must be positive")
      .nullable(),
  });

  // Handle form submission
  const handleSubmit = (values: Item) => {
    // Format dates back to YYYY-MM-DD if needed (already in correct format from input)
    const formattedValues = {
      ...values,
      valid_date: values.valid_from_date || null,
      expiry_date: values.exp_date || null,
    };

    console.log("Updating item with data:", formattedValues); // Debug log

    axios
      .put(`${apiUrl}/items/update_item/${id}`, formattedValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Item updated successfully");
          // Refetch data after successful update
          getData();
          router.push("/dashboard/items/ItemDefinitions");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error updating item:", err);
        toast.error(err.response?.data?.message || "Failed to update item");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="edit-item">
      <h2>Edit Item</h2>
      <Formik
        initialValues={item}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="field">
              <label htmlFor="item_code">Item Code</label>
              <span className="read-only-field">{item.item_code}</span>
            </div>
            <ErrorMessage name="item_code">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <label htmlFor="item_name">Item Name</label>
            <CustomField name="item_name" type="text" />
            <ErrorMessage name="item_name">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <label htmlFor="supplier_id">Supplier</label>
            <CustomField name="supplier_id" type="text" />
            <ErrorMessage name="supplier_id">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <label htmlFor="unit_price">Unit Price</label>
            <CustomField name="unit_price" type="number" />
            <ErrorMessage name="unit_price">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <label htmlFor="description">Description</label>
            <CustomField name="description" type="textarea" />
            <ErrorMessage name="description">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <label htmlFor="purchase_price">Purchase Price</label>
            <CustomField name="purchase_price" type="number" />
            <ErrorMessage name="purchase_price">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <label htmlFor="valid_from_date">Valid From Date</label>
            <Field
              name="valid_from_date"
              type="date"
              className="custom-input"
              value={values.valid_from_date || ""}
            />
            <ErrorMessage name="valid_from_date">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <label htmlFor="exp_date">Expiry Date</label>
            <Field
              name="exp_date"
              type="date"
              className="custom-input"
              value={values.exp_date || ""}
            />
            <ErrorMessage name="exp_date">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>

            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/items/ItemDefinitions")}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditItem;
