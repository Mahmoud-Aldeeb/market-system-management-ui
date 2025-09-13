/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import "@/app/styles/editNavTab.scss";
import { toast } from "react-toastify";
import CustomField from "../common/CustomField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";
interface NavTab {
  tab_id: number;
  tab_name: string;
}

export default function EditNavTab() {
  const { navtab } = useParams<{ navtab: string }>();
  const router = useRouter();
  const { setPageName }: any = useContext(PageNameContext);
  const [navTab, setNavTab] = useState<NavTab>({ tab_id: 0, tab_name: "" });
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
=======

>>>>>>> upstream/main
  useEffect(() => {
    setPageName("Edit Nav Tab");

    if (navtab) {
      axios
<<<<<<< HEAD
        .get(`${apiUrl}/nav/nav-tab/${navtab}`, {
=======
        .get(`http://localhost:8090/nav/nav-tab/${navtab}`, {
>>>>>>> upstream/main
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setNavTab(res.data.nav_tab);
        })
        .catch((err) => {
          console.error("Error fetching nav tab:", err);
          toast.error("Failed to fetch nav tab");
        });
    }
  }, [navtab, setPageName]);

  const handleSave = (values: any) => {
    axios
<<<<<<< HEAD
      .put(`${apiUrl}/nav/nav-tab/${navTab.tab_id}`, values, {
=======
      .put(`http://localhost:8090/nav/nav-tab/${navTab.tab_id}`, values, {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        router.push("/dashboard/users/allnavtab");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="edit-nav-tab">
      <Formik
        enableReinitialize
        initialValues={{
          tab_name: navTab.tab_name || "",
        }}
        onSubmit={(values) => {
          handleSave(values);
        }}
        validationSchema={Yup.object({
          tab_name: Yup.string().required("Tab Name Required"),
        })}
      >
        <Form>
          <CustomField
            value={navTab.tab_name}
            type="text"
            placeholder="Tab Name"
            name="tab_name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNavTab({ ...navTab, tab_name: e.target.value })
            }
          />
          <ErrorMessage name="tab_name">
            {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
          </ErrorMessage>
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
}
