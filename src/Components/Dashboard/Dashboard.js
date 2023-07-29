import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  var { username, role } = useSelector((store) => store.userReducer);
  const [patientCount, setPatientCount] = useState("");
  const [doctorCount, setDoctorCount] = useState("");
  const [medicineCount, setMedicineCount] = useState("");
  const [visitsCount, setVisitsCount] = useState("");

  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, [role]);

  useEffect(() => {
    fetch("http://localhost:2121/patient/getAll")
      .then((response) => response.json())
      .then((data) => setPatientCount(data.length));

    fetch("http://localhost:2121/doctor/getAll")
      .then((response) => response.json())
      .then((data) => setDoctorCount(data.length));

    fetch("http://localhost:2121/medicine/getAll")
      .then((response) => response.json())
      .then((data) => setMedicineCount(data.length));

    fetch("http://localhost:2121/visits/getAll")
      .then((response) => response.json())
      .then((data) => setVisitsCount(data.length));
  }, []);

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
            <h3>Total Patients Treated </h3>
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body">
              <p className="removeMargins">
                Our all time patients visited count is{" "}
                <i>
                  <b>{patientCount}</b>
                </i>{" "}
                and Total treatments count is{" "}
                <i>
                  <b>{visitsCount}</b>
                </i>
                . We are trying our best to take good care of our Patients.
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard-card-container">
          <div className="dashboard-card-title text-center">
            <h3>Total Doctors Available</h3>
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body">
              <p className="removeMargins">
                we provide doctors with various specilizations. We have{" "}
                <i>
                  <b>{doctorCount}</b>
                </i>{" "}
                doctors available right now!! and we have around{" "}
                <i>
                  <b>{doctorCount}</b>
                </i>{" "}
                medicines readily available in our Store.
              </p>
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
              care for the Patients.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
