/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useContext, useEffect } from "react";
import UserDataContext from "@/app/context/userdata";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { setUserData }: any = useContext(UserDataContext);
  const router = useRouter();
<<<<<<< HEAD
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
=======
>>>>>>> upstream/main
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
<<<<<<< HEAD
        .get(`${apiUrl}/users/verify_token`, {
=======
        .get("http://localhost:8090/users/verify_token", {
>>>>>>> upstream/main
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success === false) {
            localStorage.removeItem("token");
            router.push("/");
          }
          setUserData(res.data.user);
          console.log(res.data.user);
          // هنا ممكن تضيف منطق للتعامل مع البيانات، زي تحديث state
        })
        .catch((err) => {
          console.log(err);
          router.push("/");
          localStorage.removeItem("token");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } else {
      router.push("/");
      // ممكن هنا تعمل redirect لصفحة تسجيل الدخول لو مفيش token
    }
  }, [router, setUserData]);

  return <div></div>;
}
