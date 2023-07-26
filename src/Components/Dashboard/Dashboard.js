import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  var { username, role } = useSelector((store) => store.userReducer);
  const [patientCount, setPatientCount] = useState(10);
  const [doctorCount, setDoctorCount] = useState(10);

  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, [role]);

  return (
    <>
      <div className="dashboard-top-section">
        <h3 className="text-center">
          Welcome to Patient Management System, <i>{username}</i>
        </h3>
      </div>
      <div className="card-box">
        <div className="dashboard-card-container">
          <div className="dashboard-card-title text-center">
            <h3>Total patients Treated </h3>
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body">
              Our all time patients treated count is {patientCount}
            </div>
          </div>
        </div>
        <div className="dashboard-card-container">
          <div className="dashboard-card-title text-center">
            <h3>Total Doctors available</h3>
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body">
              we provide doctors with various specilizations. We have around{" "}
              {doctorCount}
            </div>
          </div>
        </div>
        <div className="dashboard-card-container">
          <div className="dashboard-card-title text-center">
            <h3>About</h3>
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body">
              Patient Management System is an online software application where
              we can store information and access it anytime to provide accurate
              care.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
