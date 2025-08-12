/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/styles/login.scss";
import React, { useState, useEffect } from "react";
import HeaderComponent from "../common/HeaderComponent";
import { useRouter } from "next/navigation";
import axios from "axios";
import CustomField from "../common/CustomField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ErrorMessageP from "../common/ErrorMessage";

export default function Login() {
  const router = useRouter();

  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [userData, setUserData] = useState<any>(null);

  // التحقق من التوكن لو موجود
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8090/users/verify_token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (!res.data.success) {
            localStorage.removeItem("token");
            router.push("/");
          } else {
            router.push("/dashboard");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/");
        });
    }
  }, [router]);

  // الخطوة الثانية: اختيار الفرع وتوليد التوكن
  function handleSelectBranch() {
    if (!selectedBranch) return toast.error("Please select a branch");

    axios
      .post("http://localhost:8090/users/login_step2", {
        userId: userData.userId,
        branchId: selectedBranch,
        username: userData.username,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.message);
          router.push("/dashboard");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error selecting branch");
      });
  }

  return (
    <div className="login-form">
      <HeaderComponent headearName="Login" />

      {/* فورم تسجيل الدخول */}
      {branches.length === 0 ? (
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username Required"),
            password: Yup.string().required("Password Required"),
          })}
          onSubmit={(values) => {
            axios
              .post("http://localhost:8090/users/login_step1", values)
              .then((res) => {
                if (res.data.success && res.data.branches.length > 0) {
                  setBranches(res.data.branches);
                  setUserData({
                    userId: res.data.userId,
                    username: res.data.username,
                  });
                  toast.info("Please choose your branch");
                } else {
                  toast.error(res.data.message);
                }
              })
              .catch((err) => {
                console.error(err);
                toast.error("Error logging in");
              });
          }}
        >
          {() => (
            <Form>
              <div className="log-div">
                <CustomField
                  id="username"
                  name="username"
                  placeholder="Username"
                  type="text"
                />
                <ErrorMessage className="error" name="username">
                  {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
                </ErrorMessage>
              </div>
              <div className="log-div">
                <CustomField
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <ErrorMessage name="password">
                  {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
                </ErrorMessage>
              </div>
              <div className="log-div">
                <button type="submit">Login</button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        // عرض اختيار الفرع
        <div className="log-div">
          <select
            id="branch-select"
            name="branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.branch_id} value={branch.branch_id}>
                {branch.branch_name}
              </option>
            ))}
          </select>
          <div className="log-div" style={{ marginTop: "15px" }}>
            <button type="button" onClick={handleSelectBranch}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
