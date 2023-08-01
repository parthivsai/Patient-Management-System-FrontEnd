import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [s, setS] = useState("");

  useEffect(() => {
    try {
      axios
        .post("http://localhost:1111/doctor-service/doctor/add", "Hello Mate")
        .then((response) => response.data)
        .then((data) => setS(data));
    } catch (error) {
      console.error("AxiosError:", error);
    }
  }, []);

  return <div>Its working {s}</div>;
};

export default Test;
