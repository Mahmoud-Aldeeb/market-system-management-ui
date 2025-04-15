/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function UserDetails({
  pic,
  username,
  role,
}: {
  pic: string;
  username: string;
  role: string;
}) {
  return (
    <div className="user-details">
      <img src={pic} alt="user-profile-picture" />
      <h1>{username}</h1>
      <p>{role}</p>
    </div>
  );
}
