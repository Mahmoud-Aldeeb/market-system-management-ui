"use client";
import React, { useCallback, useState } from "react";
import Notfi from "../components/common/Notfi";

interface Notfication {
  title: string;
  message: string;
  color: string;
  time?: number;
}

export default function useNotfications() {
  const [shwoNotfications, setShowNotfications] = useState(false);
  const [notficationData, setNotficationData] = useState<Notfication>({
    title: "",
    message: "",
    color: "",
    time: 0,
  });

  const HandelNotfication = useCallback((data: Notfication) => {
    setShowNotfications(true);
    setNotficationData(data);
    setTimeout(() => {
      setShowNotfications(false);
    }, data.time);
  }, []);

  function NotficationComponent() {
    return (
      <div>
        {shwoNotfications && (
          <Notfi
            title={notficationData.title}
            message={notficationData.message}
            color={notficationData.color}
          />
        )}
      </div>
    );
  }
  return { NotficationComponent, HandelNotfication };
}
