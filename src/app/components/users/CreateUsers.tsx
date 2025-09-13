"use client";
import "@/app/styles/createUser.scss";
import { PageNameContext } from "@/app/context/pageName";
import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import CustomField from "../common/CustomField";
import { toast } from "react-toastify";
import ErrorMessageP from "../common/ErrorMessage";
import * as Yup from "yup";

// Define interfaces for the data structures
interface Role {
  role_name: string;
  role_description: string;
}

interface Department {
  dep: string;
  depDescription: string;
}

interface FormData {
  username: string;
  password: string;
  email: string;
  phone: string;
  dep: string;
  role: string;
}

// Define the context type
interface PageNameContextType {
  setPageName: (name: string) => void;
}

export default function CreateUsers() {
  const { setPageName } = useContext(PageNameContext) as PageNameContextType;

  const [role, setRole] = useState<Role[]>([
    { role_name: "", role_description: "" },
  ]);
  const [department, setDepartment] = useState<Department[]>([
    { dep: "", depDescription: "" },
  ]);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    phone: "",
    dep: "",
    role: "",
  });
  const [pic, setPic] = useState<File | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setPageName("Create Users");
  }, [setPageName]);

  useEffect(() => {
    axios
      .get<{ departments: Department[] }>(`${apiUrl}/users/get_dep`)
      .then((res) => setDepartment(res.data.departments))
      .catch((err) => console.log(err));

    axios
      .get<{ roles: Role[] }>(`${apiUrl}/users/get_role`)
      .then((res) => setRole(res.data.roles))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPic(e.target.files[0]);
    } else {
      setPic(null);
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("dep", formData.dep);
    data.append("role", formData.role);
    if (pic) data.append("pic", pic);

    await axios
      .post<{ success: boolean; message: string }>(
        `${apiUrl}/users/create_user`,
        data
      )
      .then((res) => {
        if (res.data.message == "User created successfully") {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="create-user">
      <Formik
        enableReinitialize
        initialValues={{
          username: formData.username || "",
          password: formData.password || "",
          email: formData.email || "",
          phone: formData.phone || "",
          dep: formData.dep || "",
          role: formData.role || "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          username: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
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
          <div className="create-user-div">
            <CustomField
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <ErrorMessage name="username">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-user-div">
            <CustomField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="create-user-div">
            <CustomField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <ErrorMessage name="email">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-user-div">
            <CustomField
              type="number"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <ErrorMessage name="phone">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-user-div">
            <CustomField
              list="department"
              type="text"
              name="dep"
              placeholder="Department"
              value={formData.dep}
              onChange={handleInputChange}
            />
            <datalist id="department">
              {department.map((dep, index) => (
                <option key={index} value={dep.dep}>
                  {dep.dep}
                </option>
              ))}
            </datalist>
            <ErrorMessage name="dep">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-user-div">
            <CustomField
              list="role"
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleInputChange}
            />
            <datalist id="role">
              {role.map((role, index) => (
                <option key={index} value={role.role_name}>
                  {role.role_description}
                </option>
              ))}
            </datalist>
            <ErrorMessage name="role">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-user-div">
            <CustomField
              type="file"
              name="pic"
              placeholder="Profile Picture"
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
            />
            <ErrorMessage name="pic">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="create-user-div">
            <button type="submit">Create User</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
