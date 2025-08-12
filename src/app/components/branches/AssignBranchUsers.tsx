/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import React, { useContext, useEffect, useState, useRef } from "react";
import CustomField from "../common/CustomField";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";
import "@/app/styles/assignBranchUsers.scss";

export default function AssignBranchUsers() {
  const { setPageName }: any = useContext(PageNameContext);
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [userBranches, setUserBranches] = useState([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  function fetchUsers() {
    axios
      .get("http://localhost:8090/users/all_users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  function fetchBranches() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8090/branch/branches", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setBranches(res.data.branches);
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  function fetchUserBranches(username: string, setFieldValue: any) {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (!username) {
        setUserBranches([]);
        setFieldValue("userbranches", []);
        return;
      }
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8090/branch/user_branches/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setUserBranches(res.data.branches);
          setFieldValue(
            "userbranches",
            res.data.branches.map((branch: any) => String(branch.branch_id))
          );
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setUserBranches([]);
          setFieldValue("userbranches", []);
        });
    }, 300);
  }

  useEffect(() => {
    setPageName("Assign Branch Users");
    fetchUsers();
    fetchBranches();
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="assign-branch-users">
      <Formik
        enableReinitialize
        initialValues={{
          username: "",
          userbranches: [],
        }}
        onSubmit={(values) => {
          const token = localStorage.getItem("token");
          axios
            .post(`http://localhost:8090/branch/user_branches`, values, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              toast.success(res.data.message);
            })
            .catch((err) => toast.error(err.response.data.message));
        }}
        validationSchema={yup.object({
          username: yup.string().required("Username Required"),
          userbranches: yup
            .array()
            .of(yup.string().required("Branch ID is required"))
            .min(1, "At least one branch must be selected")
            .test(
              "unique-branches",
              "Duplicate branches are not allowed",
              (value) => {
                if (!value) return false;
                const uniqueBranches = new Set(value);
                return uniqueBranches.size === value.length;
              }
            ),
        })}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <CustomField
              name="username"
              type="text"
              placeholder="Username"
              list="users"
              onChange={(e: any) => {
                const username = e.target.value;
                setFieldValue("username", username);
                setFieldValue("userbranches", []);
                fetchUserBranches(username, setFieldValue);
              }}
              onBlur={() => {
                setFieldValue("username", values.username);
              }}
            />
            <datalist id="users">
              {users?.map((user: any) => (
                <option key={user.id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </datalist>
            <ErrorMessage name="username">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
            <FieldArray name="userbranches">
              {({ remove, push }) => (
                <div className="branches">
                  {values.userbranches?.map((branch: any, index: number) => (
                    <div className="branch" key={index}>
                      <CustomField
                        name={`userbranches.${index}`}
                        type="text"
                        placeholder="Branch"
                        list="branches"
                      />
                      <datalist id="branches">
                        {branches?.map((branch: any) => (
                          <option
                            key={branch.branch_id}
                            value={branch.branch_id}
                          >
                            {branch.branch_name}
                          </option>
                        ))}
                      </datalist>
                      <button
                        className="remove"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove Accsess
                      </button>
                    </div>
                  ))}
                  <ErrorMessage name="userbranches">
                    {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
                  </ErrorMessage>
                  <button
                    className="add"
                    type="button"
                    onClick={() => push("")}
                  >
                    Add Branch
                  </button>
                </div>
              )}
            </FieldArray>
            <button className="action" type="submit">
              Assign Branches
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
