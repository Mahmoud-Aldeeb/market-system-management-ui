/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/itemDefinitions.scss";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ItemDefinitions() {
  const { setPageName }: any = useContext(PageNameContext);
  const searchParams = useSearchParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemData = searchParams.get("item")
    ? JSON.parse(decodeURIComponent(searchParams.get("item")!))
    : null;

  // Function to format date to YYYY/MM/DD
  const formatDisplayDate = (dateStr: string | null) => {
    if (!dateStr || typeof dateStr !== "string") return "Not specified";

    // Try parsing as ISO 8601 date (e.g., "2025-09-01T21:00:00.000Z")
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }

    // Fallback for YYYY-MM-DD or YYYY-MM-DD HH:MM:SS
    let match = dateStr.match(
      /^(\d{4})-(\d{2})-(\d{2})(?:\s\d{2}:\d{2}:\d{2})?$/
    );

    if (!match) {
      console.error(`Invalid date format: ${dateStr}`);
      return "Invalid date";
    }

    const [, year, month, day] = match;
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    setPageName("Items List");
    // Fetch all items with pagination
    axios
      .get(
        `${apiUrl}/items/get_items?page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          console.log("Items data:", res.data.data); // Keep for debugging
          setItems(res.data.data || []);
          setTotalPages(res.data.pagination.totalPages || 1);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        toast.error("Failed to fetch items");
      });
  }, [setPageName, currentPage, itemsPerPage]);

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    [item.item_code, item.supplier_id, item.item_name]
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle delete item
  const handleDelete = (itemId: number) => {
    // if (window.confirm("هل أنت متأكد من حذف هذا الصنف؟")) {
    axios
      .delete(`${apiUrl}/items/delete_item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Update the items list by filtering out the deleted item
          setItems((prevItems) =>
            prevItems.filter((item) => item.item_id !== itemId)
          );
          // If current page has no items left, go to previous page
          if (filteredItems.length === 1 && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
        toast.error(err.response?.data?.message || "فشل في حذف الصنف");
      });
    // }
  };

  return (
    <div className="item-definitions">
      <h2>Items List</h2>

      {itemData ? (
        <div className="item-details">
          <h3>تفاصيل الصنف</h3>
          <div className="detail-row">
            <span className="label">كود الصنف:</span>
            <span className="value">{itemData.item_code}</span>
          </div>
          <div className="detail-row">
            <span className="label">اسم الصنف:</span>
            <span className="value">{itemData.item_name}</span>
          </div>
          <div className="detail-row">
            <span className="label">معرف المورد:</span>
            <span className="value">{itemData.supplier_id}</span>
          </div>
          <div className="detail-row">
            <span className="label">سعر الوحدة:</span>
            <span className="value">{itemData.unit_price}</span>
          </div>
          <div className="detail-row">
            <span className="label">سعر الشراء:</span>
            <span className="value">{itemData.purchase_price}</span>
          </div>
          <div className="detail-row">
            <span className="label">الوصف:</span>
            <span className="value">{itemData.description || "غير متوفر"}</span>
          </div>
          <div className="detail-row">
            <span className="label">تاريخ الصلاحية من:</span>
            <span className="value">
              {formatDisplayDate(itemData.valid_from_date)}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">تاريخ انتهاء الصلاحية:</span>
            <span className="value">
              {formatDisplayDate(itemData.exp_date)}
            </span>
          </div>
          <div className="detail-row">
            <button></button>
          </div>
        </div>
      ) : (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Item Code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredItems.length > 0 ? (
            <>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Supplier ID</th>
                    <th>Unit Price</th>
                    <th>purchase price</th>
                    <th>Description</th>
                    <th>Valid From Date</th>
                    <th>Expiry Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.item_id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.item_code}</td>
                      <td>{item.item_name}</td>
                      <td>{item.supplier_id}</td>
                      <td>{item.unit_price}</td>
                      <td>{item.purchase_price}</td>
                      <td>{item.description || "Not available"}</td>
                      <td>{formatDisplayDate(item.valid_from_date)}</td>
                      <td>{formatDisplayDate(item.exp_date)}</td>
                      <td>
                        <button className="btn">
                          <Link
                            href={`/dashboard/items/EditItem/${item.item_id}`}
                            className="btn_link"
                          >
                            Edit
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn delete-btn"
                          onClick={() => handleDelete(item.item_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={page === currentPage ? "active" : ""}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No items match the search criteria.</p>
          )}
        </>
      )}
    </div>
  );
}
