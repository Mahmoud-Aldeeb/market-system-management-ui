/* eslint-disable @next/next/no-img-element */
import React from "react";
import "@/app/styles/userCard.scss";

export default function UserCard({
  pic,
  name,
  role,
  phone,
  department,
  createdAt,
}: {
  pic: string;
  name: string;
  role: string;
  phone: string;
  department: string;
  createdAt: string;
}) {
  return (
    <div className="user-card">
      <div className="user-card-image">
        <img src={pic} alt="user-profile-picture" loading="lazy" />
      </div>
      <div className="details">
        <h1>{name}</h1>
        <p>{role}</p>
        <p>{department}</p>
        <p>{phone}</p>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
