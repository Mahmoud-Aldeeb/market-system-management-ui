/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect, useState } from "react";
import "@/app/styles/allWareHouse.scss";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
interface warehouseType {
  warehouse_id?: number;
  warehouse_name?: string;
  location?: string | null;
  capacity?: string | null;
}

export default function AllWareHouse() {
  const { setPageName }: any = useContext(PageNameContext);
  const [warehouses, setWarehouses] = useState<warehouseType[]>([]);
  const [permission, setPermission] = useState<{ dep: string; role: string }>({
    dep: "",
    role: "",
  });
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  function fetchPermission() {
    axios
      .get(`${apiUrl}/users/verify_token`, {
=======

  function fetchPermission() {
    axios
      .get("http://localhost:8090/users/verify_token", {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.user);
        setPermission(res.data.user);
      })
      .catch((err) => console.log(err));
  }
  function fetchWarehouses() {
    axios
<<<<<<< HEAD
      .get(`${apiUrl}/warehouses/warehouses`, {
=======
      .get("http://localhost:8090/warehouses/warehouses", {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setWarehouses(res.data.warehouses);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    setPageName("All WareHouse");
    fetchPermission();
    fetchWarehouses();
  }, []);

  function handelDeleteWarehouse(id: any) {
    axios
<<<<<<< HEAD
      .delete(`${apiUrl}/warehouses/delete_warehouse/${id}`, {
=======
      .delete(`http://localhost:8090/warehouses/delete_warehouse/${id}`, {
>>>>>>> upstream/main
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchWarehouses();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="all-warehouse">
      {warehouses.map((warehouse: warehouseType) => (
        <div className="warehouse-card" key={warehouse.warehouse_id}>
          <h2>{warehouse.warehouse_name}</h2>
          <p>Location: {warehouse.location}</p>
          <p>Capacity: {warehouse.capacity || "N/A"}</p>
          {permission.role === "Super Admin" && permission.dep === "IT" && (
            <div className="actions">
              <Link
                className="link"
                href={`/dashboard/warehouses/${warehouse.warehouse_id}`}
              >
                <button className="edit">Edit</button>
              </Link>
              <button
                className="delete-btn"
                onClick={() => handelDeleteWarehouse(warehouse.warehouse_id)}
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
