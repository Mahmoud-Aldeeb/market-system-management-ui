/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/createRole.scss";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomField from "../common/CustomField";
import { Form, Formik, useField } from "formik";
import dynamic from "next/dynamic";

// استيراد react-select ديناميكياً
const Select = dynamic(() => import("react-select"), { ssr: false });

const permissions = [
  { label: "Create", value: "create" },
  { label: "Read", value: "read" },
  { label: "Update", value: "update" },
  { label: "Delete", value: "delete" },
];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CreateRole() {
  const { setPageName }: any = useContext(PageNameContext);

  useEffect(() => {
    setPageName("Create Role");
  }, [setPageName]);

  const handleSubmit = (values: any) => {
    const token = localStorage.getItem("token");
    axios
      .post(`${apiUrl}/users/create_role`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.message === "Role created successfully") {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const CustomSelect = ({ name, options, placeholder }: any) => {
    const [field, , helpers] = useField(name);
    const handleChange = (selectedOptions: any) => {
      helpers.setValue(
        selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
      );
    };

    return (
      <Select
        name={name}
        placeholder={placeholder}
        className="select"
        isMulti
        options={options}
        value={options.filter((option: any) =>
          field.value.includes(option.value)
        )}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="create-role">
      <Formik
        enableReinitialize
        initialValues={{
          roleName: "",
          roleDesc: "",
          permissions: [], // مصفوفة تحتوي على القيم (strings) المختارة
        }}
        onSubmit={(values) => {
          // console.log(values);
          handleSubmit(values);
        }}
      >
        {() => (
          <Form>
            <div className="role-div">
              <CustomField
                placeholder="Role Name"
                type="text"
                name="roleName"
              />
            </div>
            <div className="role-div">
              <CustomField
                placeholder="Role Description"
                type="text"
                name="roleDesc"
              />
            </div>
            <div className="role-div">
              <CustomSelect
                name="permissions"
                options={permissions}
                placeholder="Select Permissions"
              />
            </div>
            <div className="role-div">
              <button className="save" type="submit">
                Save Role
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
