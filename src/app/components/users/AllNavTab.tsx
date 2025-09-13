/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import "@/app/styles/allNavTab.scss";
import { toast } from "react-toastify";

export default function AllNavTab() {
  const { setPageName }: any = useContext(PageNameContext);
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
=======
>>>>>>> upstream/main

  const [data, setData] = useState([]);
  function handelDelete(id: number) {
    axios
<<<<<<< HEAD
      .delete(`${apiUrl}/nav/nav-tab/${id}`)
=======
      .delete(`http://localhost:8090/nav/nav-tab/${id}`)
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
  function fetchData() {
    axios
<<<<<<< HEAD
      .get(`${apiUrl}/nav/nav-tab`)
=======
      .get("http://localhost:8090/nav/nav-tab")
>>>>>>> upstream/main
      .then((response) => {
        setData(response.data.nav_tab);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchData();
    setPageName("All Nav Tab");
  }, []);
  return (
    <div className="all-nav-tab">
      <div className="nav-tab-list">
        {data?.map((item: any, index: number) => (
          <div className="nav-tab" key={index}>
            <p>{item.tab_name}</p>
            <div className="actions">
              <Link
                className="link"
                href={`/dashboard/users/allnavtab/${item.tab_id}`}
              >
                <button>Edit</button>
              </Link>
              <button onClick={() => handelDelete(item.tab_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
