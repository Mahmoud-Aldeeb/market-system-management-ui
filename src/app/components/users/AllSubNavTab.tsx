/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/allSubNavTab.scss";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AllSubNavTab() {
  const { setPageName }: any = useContext(PageNameContext);
  const [data, setData] = useState([]);
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  function fetchData() {
    axios
      .get(`${apiUrl}/nav/nav-sub-tab`)
=======

  function fetchData() {
    axios
      .get("http://localhost:8090/nav/nav-sub-tab")
>>>>>>> upstream/main
      .then((response) => {
        setData(response.data.nav_sub_tab);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handelDelete(id: number) {
    axios
<<<<<<< HEAD
      .delete(`${apiUrl}/nav/nav-sub-tab/${id}`)
=======
      .delete(`http://localhost:8090/nav/nav-sub-tab/${id}`)
>>>>>>> upstream/main
      .then((res) => {
        toast.success(res.data.message);
        fetchData();
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  useEffect(() => {
    setPageName("All Sub Nav Tab");
    fetchData();
  }, []);

  return (
    <div className="all-sub-nav-tab">
      <div className="sub-nav-tab-list">
        {data.map((item: any) => (
          <div key={item.id} className="nav-tab">
            <p>{item.name}</p>
            <p>{item.tab_name}</p>
            <p>{item.href}</p>
            <div className="actions">
              <Link
                className="link"
                href={`/dashboard/users/allsubnavtab/${item.id}`}
              >
                <button>Edit</button>
              </Link>
              <button onClick={() => handelDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
