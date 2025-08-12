/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function UserDetails({
  pic,
  username,
  role,
  LoginTime,
  exp_token,
  dep,
  branchName,
}: {
  pic: string;
  username: string;
  role: string;
  LoginTime: string;
  exp_token: string;
  dep: string;
  branchName: string;
}) {
  return (
    <div className="user-details">
      <img src={pic} alt="user-profile-picture" loading="lazy" />
      <h1>{username}</h1>
      <p>
        {role} | {dep}
      </p>
      <p>{branchName}</p>
      <p>{new Date(LoginTime).toLocaleString()}</p>
      <p>{new Date(exp_token).toLocaleString()}</p>
    </div>
  );
}
