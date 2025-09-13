/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import UserDetails from "./UserDetails";
import UserDataContext from "@/app/context/userdata";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SideNav() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [nav_tab, set_Nav_tab] = useState([]);
  const [nav_sub_tab, set_Nav_sub_tab] = useState([]);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const { userData, setUserData }: any = useContext(UserDataContext);
  const router = useRouter();
  const toggleTab = (tabName: string) => {
    setActiveTab((prev) => (prev === tabName ? null : tabName));
  };
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
=======
>>>>>>> upstream/main

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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
          if (res.data.success === false) {
            localStorage.removeItem("token");
            router.push("/");
          }
          setUserData(res.data.user);
          // هنا ممكن تضيف منطق للتعامل مع البيانات، زي تحديث state
        })
        .catch((err) => {
          console.log(err);
          router.push("/");
          localStorage.removeItem("token");
          // هنا ممكن تضيف منطق للتعامل مع الخطأ، زي إظهار رسالة لليوزر
        });
    } else {
      router.push("/");
      // ممكن هنا تعمل redirect لصفحة تسجيل الدخول لو مفيش token
    }

<<<<<<< HEAD
    axios.get(`${apiUrl}/nav/nav-tab`).then((res) => {
      console.log(res.data);
      set_Nav_tab(res.data.nav_tab);
    });
    axios.get(`${apiUrl}/nav/nav-sub-tab`).then((res) => {
=======
    axios.get("http://localhost:8090/nav/nav-tab").then((res) => {
      console.log(res.data);
      set_Nav_tab(res.data.nav_tab);
    });
    axios.get("http://localhost:8090/nav/nav-sub-tab").then((res) => {
>>>>>>> upstream/main
      console.log(res.data);
      set_Nav_sub_tab(res.data.nav_sub_tab);
    });
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target as Node)
    ) {
      setActiveTab(null); // Close all sub-navigation when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside ref={sideNavRef}>
      <section className="user-details">
        <UserDetails
<<<<<<< HEAD
          pic={`${apiUrl} ${userData.pic}`}
=======
          pic={`http://localhost:8090${userData.pic}`}
>>>>>>> upstream/main
          username={userData.username}
          role={userData.role}
          LoginTime={userData.token_created_date}
          dep={userData.dep}
          exp_token={userData.token_expiry_date}
          branchName={userData.branch_name}
        />
      </section>
      <nav className="side-nav">
        <section className="navigation">
          <ul>
            {nav_tab.map((tab: any) => (
              <li key={tab.tab_id}>
                <button
                  className={`nav-tab ${
                    activeTab === tab.tab_name ? "active" : ""
                  }`}
                  onClick={() => toggleTab(tab.tab_name)}
                >
                  {tab.tab_name}
                </button>
                {activeTab === tab.tab_name && (
                  <div className="sub-nav show">
                    {nav_sub_tab
                      .filter(
                        (sub_tab: any) => sub_tab.tab_name === tab.tab_name
                      )
                      .map((sub_tab: any) => (
                        <p key={sub_tab.id}>
                          <Link className="sub-nav-tab" href={sub_tab.href}>
                            {sub_tab.name}
                          </Link>
                        </p>
                      ))}
                  </div>
                )}
              </li>
            ))}

            {/* {userData.role === "Super Admin" && userData.dep === "IT" && ( */}

            {/* <li>
                <Link className="sub-nav-tab" href="/dashboard/suppliers">
                  Create Supplier
                </Link>
                <Link
                  className="sub-nav-tab"
                  href="/dashboard/suppliers/allsupplier"
                >
                  All Suppliers
                </Link>
              </li> */}
            {/* )} */}

            {/* Warehouses */}
            {/* <li>
              <button
                className={`nav-tab ${
                  activeTab === "warehouses" ? "active" : ""
                }`}
                onClick={() => toggleTab("warehouses")}
              >
                Warehouses
              </button>
            </li> */}
            {/* <ul
              className={`sub-nav ${activeTab === "warehouses" ? "show" : ""}`}
            >
              <li>
                <Link className="sub-nav-tab" href="/dashboard/warehouses">
                  Create Warehouse
                </Link>
                <Link
                  className="sub-nav-tab"
                  href="/dashboard/warehouses/allwarehouse"
                >
                  All Warehouse
                </Link>
              </li>
            </ul> */}

            {/* Items */}
            {/* <li>
              <button
                className={`nav-tab ${activeTab === "items" ? "active" : ""}`}
                onClick={() => toggleTab("items")}
              >
                Items
              </button>
            </li>
            <ul className={`sub-nav ${activeTab === "items" ? "show" : ""}`}>
              <li>
                <Link className="sub-nav-tab" href="/dashboard/items">
                  Create Item
                </Link>
                <Link className="sub-nav-tab" href="">
                  All Items
                </Link>
              </li>
            </ul> */}

            {/* Inventory */}
            {/* <li>
              <button
                className={`nav-tab ${
                  activeTab === "inventory" ? "active" : ""
                }`}
                onClick={() => toggleTab("inventory")}
              >
                Inventory
              </button>
            </li>
            <ul
              className={`sub-nav ${activeTab === "inventory" ? "show" : ""}`}
            >
              <li>
                <Link className="sub-nav-tab" href="">
                  Create Inventory
                </Link>
                <Link className="sub-nav-tab" href="">
                  All Inventory
                </Link>
              </li>
            </ul> */}

            {/* Customers */}
            {/* <li>
              <button
                className={`nav-tab ${
                  activeTab === "customers" ? "active" : ""
                }`}
                onClick={() => toggleTab("customers")}
              >
                Customers
              </button>
            </li>
            <ul
              className={`sub-nav ${activeTab === "customers" ? "show" : ""}`}
            >
              <li>
                <Link className="sub-nav-tab" href="">
                  Create Customer
                </Link>
                <Link className="sub-nav-tab" href="">
                  All Customers
                </Link>
              </li>
            </ul> */}

            {/* Invoice */}
            {/* <li>
              <button
                className={`nav-tab ${activeTab === "invoice" ? "active" : ""}`}
                onClick={() => toggleTab("invoice")}
              >
                Invoice
              </button>
            </li>
            <ul className={`sub-nav ${activeTab === "invoice" ? "show" : ""}`}>
              <li>
                <Link className="sub-nav-tab" href="">
                  Create Invoice Sales
                </Link>
                <Link className="sub-nav-tab" href="">
                  Create Invoice PO
                </Link>
                <Link className="sub-nav-tab" href="">
                  All Invoices
                </Link>
              </li>
            </ul> */}

            {/* Finance */}
            {/* <li>
              <button
                className={`nav-tab ${activeTab === "finance" ? "active" : ""}`}
                onClick={() => toggleTab("finance")}
              >
                Finance
              </button>
            </li>
            <ul className={`sub-nav ${activeTab === "finance" ? "show" : ""}`}>
              <li>
                <Link className="sub-nav-tab" href="">
                  Sales
                </Link>
                <Link className="sub-nav-tab" href="">
                  Return
                </Link>
                <Link className="sub-nav-tab" href="">
                  Treasury
                </Link>
              </li>
            </ul> */}

            {/* Reports */}
            {/* <li>
              <Link className="nav-tab" href="">
                Reports
              </Link>
            </li> */}

            {/* Employees */}
            {/* <li>
              <Link className="nav-tab" href="">
                Employees
              </Link>
            </li> */}

            {/* Users */}
            {/* <li>
              <button
                className={`nav-tab ${activeTab === "users" ? "active" : ""}`}
                onClick={() => toggleTab("users")}
              >
                Users
              </button>
            </li> */}
            {/* <ul className={`sub-nav ${activeTab === "users" ? "show" : ""}`}>
              <li>
                <Link className="sub-nav-tab" href="/dashboard/users/role">
                  Create Role
                </Link>
                <Link
                  className="sub-nav-tab"
                  href="/dashboard/users/department"
                >
                  Create Department
                </Link>
                <Link className="sub-nav-tab" href="/dashboard/users">
                  Create User
                </Link>
                <Link className="sub-nav-tab" href="/dashboard/users/allusers">
                  All Users
                </Link>
                <Link className="sub-nav-tab" href="/dashboard/sessions">
                  Sessions
                </Link>
              </li>
            </ul> */}
          </ul>
        </section>
      </nav>
    </aside>
  );
}
