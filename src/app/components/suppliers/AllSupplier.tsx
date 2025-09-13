/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "@/app/styles/allSupplier.scss";
import Link from "next/link";
import { toast } from "react-toastify";

export default function AllSupplier() {
  const { setPageName }: any = useContext(PageNameContext);
  const [suppliers, setSuppliers] = useState([]);

  const [userData, setUserData] = useState<{ role: string; dep: string }>({
    role: "",
    dep: "",
  });
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  function getAllSuppliers() {
    axios
      .get(`${apiUrl}/supplier/suppliers`, {
=======
  function getAllSuppliers() {
    axios
      .get("http://localhost:8090/supplier/suppliers", {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSuppliers(res.data.suppliers);
        console.log(res.data.suppliers);
      })
      .catch((err) => console.log(err));
  }
  function fetchPermission() {
    const token = localStorage.getItem("token");
    axios
<<<<<<< HEAD
      .get(`${apiUrl}/users/verify_token`, {
=======
      .get("http://localhost:8090/users/verify_token", {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setPageName("All Supplier");
    fetchPermission();

    getAllSuppliers();
  }, []);
  function handelDelete(id: any) {
    axios
<<<<<<< HEAD
      .delete(`${apiUrl}/supplier/delete_supplier/${id}`, {
=======
      .delete(`http://localhost:8090/supplier/delete_supplier/${id}`, {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        getAllSuppliers();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="all-supplier">
      {suppliers.map((supplier: any) => (
        <div className="supplier-card" key={supplier.id}>
          <p>{supplier.supplier_name}</p>
          <p>{supplier.supplier_adress}</p>
          <p>{supplier.email}</p>
          <p>{supplier.phone}</p>
          {userData.role === "Super Admin" && userData.dep == "IT" && (
            <div className="actions">
              <Link
                className="link"
                href={`/dashboard/suppliers/${supplier.id}`}
              >
                <button>Edit</button>
              </Link>
              <button
                onClick={() => {
                  handelDelete(supplier.id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
