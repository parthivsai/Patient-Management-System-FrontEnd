import React, { useState } from "react";
import { Link } from "react-router-dom";
import PatientRegister from "./PatientRegister";
import { createPortal } from "react-dom";
import DoctorRegister from "./DoctorRegister";
import "./Register.css";

const Register = () => {
  const [showPatientRegister, setShowPatientRegister] = useState(false);
  const [showDoctorRegister, setShowDoctorRegister] = useState(false);

  return (
    <>
      <div className="card-box">
        <div
          className="dashboard-card-container doctor"
          onClick={() => setShowDoctorRegister(true)}
        >
          <div className="dashboard-card-title text-center">
            <h3>Doctor</h3>
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body">Click here for doctor Registration</div>
          </div>
        </div>
        <div className="portaldiv">
          {showDoctorRegister &&
            createPortal(
              <DoctorRegister onClose={() => setShowDoctorRegister(false)} />,
              document.getElementById("root")
            )}
        </div>

        <div
          className="dashboard-card-container patient"
          onClick={() => setShowPatientRegister(true)}
        >
          <div className="dashboard-card-title text-center">
            <h3>Patient</h3>
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body">
              Click here for patient Registration.
            </div>
          </div>
        </div>
        <div className="portaldiv">
          {showPatientRegister &&
            createPortal(
              <PatientRegister onClose={() => setShowPatientRegister(false)} />,
              document.getElementById("root")
            )}
        </div>
      </div>
    </>
  );
};

export default Register;
