/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/editUser.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ErrorMessage, Form, Formik } from "formik";
import CustomField from "../common/CustomField";
import * as Yup from "yup";
import ErrorMessageP from "../common/ErrorMessage";

interface Department {
  dep: string;
  depDescription: string;
}
interface Role {
  role_name: string;
  role_description: string;
}

interface userDatatype {
  username: string;
  password: string;
  email: string;
  phone: string;
  dep: string;
  role: string;
}

export default function EditUser() {
  const router = useRouter();
  const [role, setRole] = useState<Role[]>([
    { role_name: "", role_description: "" },
  ]);
  const [department, setDepartment] = useState<Department[]>([
    { dep: "", depDescription: "" },
  ]);

  const [userData, setUserData] = useState<userDatatype>({
    username: "",
    password: "",
    email: "",
    phone: "",
    dep: "",
    role: "",
  });
  const { user } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/users/user/${user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUserData(res.data.user))
      .catch((err) => console.log(err));
    axios
      .get<{ departments: Department[] }>("http://localhost:8090/users/get_dep")
      .then((res) => setDepartment(res.data.departments))
      .catch((err) => console.log(err));

    axios
      .get<{ roles: Role[] }>("http://localhost:8090/users/get_role")
      .then((res) => setRole(res.data.roles))
      .catch((err) => console.log(err));
  }, []);

  function handelEditUser(values: any) {
    axios
      .put(`http://localhost:8090/users/edit_user/${user}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          router.push("/dashboard/users/allusers");
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  function resetPassword(e: any) {
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .put(
        `http://localhost:8090/users/reset_password/${user}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  }
  return (
    <div className="edit-user">
      <Formik
        enableReinitialize
        initialValues={userData}
        onSubmit={(values) => {
          handelEditUser(values);
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          phone: Yup.string()
            .min(11, "Phone number must be 11 digits")
            .required("Phone is required"),
          dep: Yup.string().required("Department is required"),
          role: Yup.string().required("Role is required"),
        })}
      >
        <Form>
          <div className="form-div">
            <CustomField
              name="email"
              type="text"
              placeholder="Email"
              value={userData?.email}
              onChange={(e: any) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <ErrorMessage name="email">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="form-div">
            <CustomField
              name="phone"
              type="text"
              placeholder="Phone"
              value={userData?.phone}
              onChange={(e: any) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
            <ErrorMessage name="phone">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>

          <div className="form-div">
            <select
              name="dep"
              className="select"
              onChange={(e) =>
                setUserData({ ...userData, dep: e.target.value })
              }
              value={userData?.dep}
            >
              {department.map((dep) => (
                <option key={dep.dep} value={dep.dep}>
                  {dep.dep}
                </option>
              ))}
            </select>
            <ErrorMessage name="dep">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="form-div">
            <select
              name="role"
              className="select"
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              value={userData?.role}
            >
              {role.map((role) => (
                <option key={role.role_name}>{role.role_name}</option>
              ))}
            </select>
            <ErrorMessage name="role">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="form-div">
            <button type="submit">Save</button>
          </div>
          <div className="form-div">
            <button onClick={resetPassword}>Reset Password</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
