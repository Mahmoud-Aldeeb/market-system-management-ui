"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import UserDetails from "./UserDetails";

export default function SideNav() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);

  const toggleTab = (tabName: string) => {
    setActiveTab((prev) => (prev === tabName ? null : tabName));
  };

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
          pic={"/defualt pic.jpg"}
          username={"User name"}
          role={"Admin"}
        />
      </section>
      <nav className="side-nav">
        <section className="navigation">
          <ul>
            {/* Suppliers */}
            <li>
              <button
                className={`nav-tab ${
                  activeTab === "suppliers" ? "active" : ""
                }`}
                onClick={() => toggleTab("suppliers")}
              >
                Suppliers
              </button>
            </li>
            <ul
              className={`sub-nav ${activeTab === "suppliers" ? "show" : ""}`}
            >
              <li>
                <Link className="sub-nav-tab" href="/dashboard/suppliers">
                  Create Supplier
                </Link>
                <Link className="sub-nav-tab" href="">
                  All Suppliers
                </Link>
              </li>
            </ul>

            {/* Items */}
            <li>
              <button
                className={`nav-tab ${activeTab === "items" ? "active" : ""}`}
                onClick={() => toggleTab("items")}
              >
                Items
              </button>
            </li>
            <ul className={`sub-nav ${activeTab === "items" ? "show" : ""}`}>
              <li>
                <Link className="sub-nav-tab" href="">
                  Create Item
                </Link>
                <Link className="sub-nav-tab" href="">
                  All Items
                </Link>
              </li>
            </ul>

            {/* Inventory */}
            <li>
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
            </ul>

            {/* Customers */}
            <li>
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
            </ul>

            {/* Invoice */}
            <li>
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
            </ul>

            {/* Finance */}
            <li>
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
            </ul>

            {/* Reports */}
            <li>
              <Link className="nav-tab" href="">
                Reports
              </Link>
            </li>

            {/* Employees */}
            <li>
              <Link className="nav-tab" href="">
                Employees
              </Link>
            </li>

            {/* Users */}
            <li>
              <button
                className={`nav-tab ${activeTab === "users" ? "active" : ""}`}
                onClick={() => toggleTab("users")}
              >
                Users
              </button>
            </li>
            <ul className={`sub-nav ${activeTab === "users" ? "show" : ""}`}>
              <li>
                <Link className="sub-nav-tab" href="/dashboard/users/role">
                  Create Role
                </Link>
                <Link className="sub-nav-tab" href="/dashboard/users">
                  Create User
                </Link>
                <Link className="sub-nav-tab" href="">
                  All Users
                </Link>
              </li>
            </ul>
          </ul>
        </section>
      </nav>
    </aside>
  );
}
