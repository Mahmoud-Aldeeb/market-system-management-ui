/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/editNavSubTab.scss";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import CustomField from "../common/CustomField";
import { toast } from "react-toastify";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";

export default function EditSubNavTab() {
  const { setPageName }: any = useContext(PageNameContext);
  const { subnavtab }: any = useParams();
  const [subNavTabData, setSubNavTabData] = useState<{
    name: string;
    tab_name: string;
    href: string;
  }>({
    name: "",
    tab_name: "",
    href: "",
  });
  const [tabs_name, set_tabs_name] =
    useState<{ tab_name: string; tab_id: number }[]>();
  useEffect(() => {
    setPageName("Edit Sub Nav Tab");
    axios
      .get(`http://localhost:8090/nav/nav-sub-tab/${subnavtab}`)
      .then((res) => {
        setSubNavTabData(res.data.nav_sub_tab);
      });
    axios.get("http://localhost:8090/nav/nav-tab").then((res) => {
      set_tabs_name(res.data.nav_tab);
    });
  }, []);
  function handelSubmit(values: any) {
    axios
      .put(`http://localhost:8090/nav/nav-sub-tab/${subnavtab}`, values)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => toast.error(err.response.data.message));
  }
  return (
    <div className="edit-sub-nav-tab">
      <Formik
        enableReinitialize
        initialValues={{
          name: subNavTabData.name,
          tab_name: subNavTabData.tab_name,
          href: subNavTabData.href,
        }}
        onSubmit={(values) => handelSubmit(values)}
        validationSchema={Yup.object({
          name: Yup.string().required("Name Required"),
          tab_name: Yup.string().required("Group Name Required"),
          href: Yup.string().required("href Required"),
        })}
      >
        <Form>
          <CustomField
            name="name"
            type="text"
            placeholder="Name"
            value={subNavTabData.name}
            onChange={(e: any) =>
              setSubNavTabData({ ...subNavTabData, name: e.target.value })
            }
          />
          <ErrorMessage name="name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            name="tab_name"
            type="text"
            placeholder="Group Name"
            list="tabs-name"
            value={subNavTabData.tab_name}
            onChange={(e: any) =>
              setSubNavTabData({ ...subNavTabData, tab_name: e.target.value })
            }
          />
          <datalist id="tabs-name">
            {tabs_name?.map((tab: any) => (
              <option key={tab.tab_id} value={tab.tab_name} />
            ))}
          </datalist>
          <ErrorMessage name="tab_name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <CustomField
            name="href"
            type="text"
            placeholder="href"
            value={subNavTabData.href}
            onChange={(e: any) =>
              setSubNavTabData({ ...subNavTabData, href: e.target.value })
            }
          />
          <ErrorMessage name="href">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
}
