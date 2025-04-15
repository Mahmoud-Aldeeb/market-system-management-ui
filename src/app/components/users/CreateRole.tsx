/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../common/CustomInput";
import AssignRole from "./AssignRole";

export default function CreateRole() {
  const { setPageName }: any = useContext(PageNameContext);
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [assignedPages, setAssignedPages] = useState([
    { page: "", permission: "" },
  ]);

  useEffect(() => {
    setPageName("Create Role");
  }, [setPageName]);

  const handleAssignRoleChange = (
    index: number,
    data: { page?: string; permission?: string }
  ) => {
    const updated = [...assignedPages];
    updated[index] = { ...updated[index], ...data };
    setAssignedPages(updated);
  };

  const addAssignRole = () => {
    setAssignedPages([...assignedPages, { page: "", permission: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Role Name:", roleName);
    console.log("Role Description:", roleDesc);
    console.log("Assigned Pages:", assignedPages);
    // Send this data via Axios to your backend
  };

  return (
    <div className="create-role">
      <form onSubmit={handleSubmit}>
        <div className="role-div">
          <CustomInput
            placeholder="Role Name"
            type="text"
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRoleName(e.target.value)
            }
          />
        </div>
        <div className="role-div">
          <CustomInput
            placeholder="Role Description"
            type="text"
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRoleDesc(e.target.value)
            }
          />
        </div>
        {assignedPages.map((item, index) => (
          <div className="role-div" key={index}>
            <AssignRole
              value={item}
              onChange={(data: any) => handleAssignRoleChange(index, data)}
            />
          </div>
        ))}
        <div className="role-div">
          <button type="button" onClick={addAssignRole}>
            + Add Another Page
          </button>
        </div>
        <div className="role-div">
          <button type="submit">Save Role</button>
        </div>
      </form>
    </div>
  );
}
