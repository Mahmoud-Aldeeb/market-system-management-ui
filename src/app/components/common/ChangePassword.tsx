/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/app/styles/changePassword.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { ErrorMessage, Form, Formik } from "formik";
import CustomField from "./CustomField";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ErrorMessageP from "./ErrorMessage";

export default function ChangePassword() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>("");

  const [customInputData, setCustomInputData] = useState({
    currentPassword: "password",
    newPassword: "password",
  });

  const SecretKey = process.env.NEXT_PUBLIC_API_SECRET;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      axios
        .get(`${apiUrl}/users/verify_token`, {
          headers: {
            Authorization: `${SecretKey} ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success === false) {
            localStorage.removeItem("token");
            router.push("/login");
          }
          setUserInfo(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [SecretKey, apiUrl, router]);

  function handelChangePassword(values: any) {
    const { currentPassword, newPassword } = values;
    axios
      .put(
        `${apiUrl}/users/change_password`,
        {
          username: userInfo.username,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `${SecretKey} ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.removeItem("token");
          router.push("/login");
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  }
  return (
    <div className="change-password">
      <Formik
        initialValues={{ currentPassword: "", newPassword: "" }}
        onSubmit={(values) => {
          handelChangePassword(values);
        }}
        validationSchema={Yup.object({
          currentPassword: Yup.string().required("Current Password Required"),
          newPassword: Yup.string().required("New Password Required"),
        })}
      >
        <Form>
          <div className="form-div">
            <CustomField
              name="currentPassword"
              type={customInputData.currentPassword}
              placeholder="Old Password"
            />
            <FontAwesomeIcon
              className="icon"
              icon={faEye}
              style={{
                color:
                  customInputData.currentPassword === "password"
                    ? ""
                    : "indigo",
              }}
              onClick={() => {
                setCustomInputData({
                  ...customInputData,
                  currentPassword:
                    customInputData.currentPassword === "password"
                      ? "text"
                      : "password",
                });
              }}
            />
            <ErrorMessage className="error" name="currentPassword">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="form-div">
            <CustomField
              name="newPassword"
              type={customInputData.newPassword}
              placeholder="New Password"
            />
            <FontAwesomeIcon
              style={{
                color:
                  customInputData.newPassword === "password" ? "" : "indigo",
              }}
              className="icon"
              icon={faEye}
              onClick={() => {
                setCustomInputData({
                  ...customInputData,
                  newPassword:
                    customInputData.newPassword === "password"
                      ? "text"
                      : "password",
                });
              }}
            />
            <ErrorMessage className="error" name="newPassword">
              {(msg) => <ErrorMessageP>{msg}</ErrorMessageP>}
            </ErrorMessage>
          </div>
          <div className="form-div">
            <button type="submit">Change</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
