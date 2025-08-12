/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect, useState } from "react";
import UserCard from "../common/UserCard";
import "@/app/styles/allUsers.scss";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

export default function AllUsers() {
  const { setPageName }: any = useContext(PageNameContext);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState<{ role: string; dep: string }>({
    role: "",
    dep: "",
  });
  function verifyUser() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8090/users/verify_token", {
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

  function fetchUsers() {
    axios
      .get("http://localhost:8090/users/all_users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }
  function deleteUser(username: string) {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8090/users/delete_user/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: any) => {
        fetchUsers();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  useEffect(() => {
    setPageName("Users");
    verifyUser();
    fetchUsers();
  }, [setPageName]);
  return (
    <div className="all-users">
      {users.map((user: any) => (
        <div className="user-card-view" key={user.id}>
          <UserCard
            pic={`http://localhost:8090${user.pic}`}
            name={user.username}
            role={user.role}
            phone={user.phone}
            department={user.dep}
            createdAt={new Date(user.created_date).toLocaleDateString()}
          />
          {userData.role === "Super Admin" && userData.dep == "IT" && (
            <div className="actions">
              <button className="edit">
                <Link
                  className="edit-link"
                  href={`/dashboard/users/allusers/${user.username}`}
                >
                  Edit
                </Link>
              </button>
              <button
                className="delete"
                onClick={() => deleteUser(user.username)}
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
