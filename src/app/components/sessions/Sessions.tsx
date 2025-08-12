/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PageNameContext } from "@/app/context/pageName";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function Sessions() {
  const [sessionsData, setSessionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setPageName }: any = useContext(PageNameContext);
  useEffect(() => {
    setPageName("Users Sessions");
  }, []);

  // Fetch active sessions
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8090/users/get_active_sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setSessionsData(res.data.sessions);
        } else {
          setError(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch sessions");
        setLoading(false);
      });
  }, []);

  // Handle session logout
  const handleLogout = async (username: string) => {
    if (!window.confirm(`Are you sure you want to log out ${username}?`))
      return;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        "http://localhost:8090/users/revoke_session",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { username },
        }
      );

      if (res.data.success) {
        // Remove the session from the state
        setSessionsData(
          sessionsData.filter(
            (session: { username: string }) => session.username !== username
          )
        );
        alert("Session revoked successfully");
      } else {
        setError(res.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to revoke session");
    }
  };

  return (
    <div>
      <h2>Active Sessions</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && sessionsData.length === 0 && (
        <p>No active sessions found.</p>
      )}
      {sessionsData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Token</th>
              <th>Expires At</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessionsData.map(
              (session: {
                username: string;
                token: string;
                expiry_date: string;
                created_at: string;
              }) => (
                <tr key={session.username}>
                  <td>{session.username}</td>
                  <td>{session.token}</td>
                  <td>{new Date(session.expiry_date).toLocaleString()}</td>
                  <td>{new Date(session.created_at).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleLogout(session.username)}>
                      Logout
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
