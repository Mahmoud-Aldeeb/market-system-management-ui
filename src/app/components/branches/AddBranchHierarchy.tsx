"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/app/styles/addBranchHierarchy.scss";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";

export default function AddBranchHierarchy() {
  const { setPageName }: any = useContext(PageNameContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [branches, setBranches] = useState<
    {
      branch_id: number;
      branch_name: string;
      branch_type: string;
      location: string;
      is_main_branch: number;
    }[]
  >([]);

  const [selectedParentBranch, setSelectedParentBranch] = useState<any>(null);
  const [selectedChildBranch, setSelectedChildBranch] = useState<any>(null);

  useEffect(() => {
    setPageName("Add Branch Hierarchy");
    fetchBranches();
  }, []);

  function fetchBranches() {
    const token = localStorage.getItem("token");
    axios
      .get(`${apiUrl}/branch/branches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBranches(res.data.branches);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to fetch branches");
      });
  }

  return (
    <div className="add-branch-hierarchy">
      <Formik
        initialValues={{
          parent_branch_id: 0,
          child_branch_id: 0,
        }}
        validationSchema={Yup.object({
          parent_branch_id: Yup.number()
            .positive("Parent Branch Required")
            .required("Parent Branch Required"),
          child_branch_id: Yup.number()
            .positive("Child Branch Required")
            .required("Child Branch Required")
            .test(
              "not-same-as-parent",
              "Child branch must be different from parent branch",
              function (value) {
                const { parent_branch_id } = this.parent;
                return value !== parent_branch_id;
              }
            ),
        })}
        onSubmit={(values, { resetForm }) => {
          const token = localStorage.getItem("token");
          axios
            .post(
              `${apiUrl}/branch/branch_hierarchy`,
              {
                parent_branch_id: values.parent_branch_id,
                child_branch_id: values.child_branch_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              toast.success(res.data.message);
              resetForm();
              setSelectedParentBranch(null);
              setSelectedChildBranch(null);
            })
            .catch((err) => {
              toast.error(err.response?.data?.message);
            });
        }}
      >
        {({ values, handleBlur, setFieldValue }) => {
          const handleParentChange = (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const value = Number(e.target.value);
            setFieldValue("parent_branch_id", value);
            const selected = branches.find((b) => b.branch_id === value);
            setSelectedParentBranch(selected || null);
          };

          const handleChildChange = (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const value = Number(e.target.value);
            setFieldValue("child_branch_id", value);
            const selected = branches.find((b) => b.branch_id === value);
            setSelectedChildBranch(selected || null);
          };

          return (
            <Form className="form">
              {/* Parent Branch */}
              <div className="group">
                <section className="sect1">
                  {/* <label>Parent Branch</label> */}
                  <select
                    name="parent_branch_id"
                    onChange={handleParentChange}
                    onBlur={handleBlur}
                    value={values.parent_branch_id}
                  >
                    <option value={0}>Select Parent Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage name="parent_branch_id">
                    {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
                  </ErrorMessage>
                </section>
              </div>

              {/* Child Branch */}
              <div className="group">
                <section className="sect1">
                  {/* <label>Child Branch</label> */}
                  <select
                    name="child_branch_id"
                    onChange={handleChildChange}
                    onBlur={handleBlur}
                    value={values.child_branch_id}
                  >
                    <option value={0}>Select Child Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage name="child_branch_id">
                    {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
                  </ErrorMessage>
                </section>
              </div>

              {/* Selected Branch Info */}
              {(selectedChildBranch || selectedParentBranch) && (
                <table>
                  <thead>
                    <tr>
                      <th>Parent Or Child</th>
                      <th>Branch ID</th>
                      <th>Branch Name</th>
                      <th>Branch Type</th>
                      <th>Branch Location</th>
                      <th>Is Main Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedParentBranch && (
                      <tr>
                        <td>Parent</td>
                        <td>{selectedParentBranch.branch_id}</td>
                        <td>{selectedParentBranch.branch_name}</td>
                        <td>{selectedParentBranch.branch_type}</td>
                        <td>{selectedParentBranch.location}</td>
                        <td>
                          {selectedParentBranch.is_main_branch === 1
                            ? "True"
                            : "False"}
                        </td>
                      </tr>
                    )}
                    {selectedChildBranch && (
                      <tr>
                        <td>Child</td>
                        <td>{selectedChildBranch.branch_id}</td>
                        <td>{selectedChildBranch.branch_name}</td>
                        <td>{selectedChildBranch.branch_type}</td>
                        <td>{selectedChildBranch.location}</td>
                        <td>
                          {selectedChildBranch.is_main_branch === 1
                            ? "True"
                            : "False"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              <button type="submit">Create Hierarchy</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
