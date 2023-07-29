import React, { useState } from "react";
import PatientRegister from "./PatientRegister";
import { createPortal } from "react-dom";
import DoctorRegister from "./DoctorRegister";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";

import "./Register.css";

const Register = () => {
  const [showPatientRegister, setShowPatientRegister] = useState(false);
  const [showDoctorRegister, setShowDoctorRegister] = useState(false);

  return (
    <>
      <div className="card-box register">
        <div
          className="dashboard-card-container doctor"
          onClick={() => setShowDoctorRegister(true)}
        >
          <div className="dashboard-card-title text-center">
            <FaUserMd size={150} />
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body text-center">
              <i>Click here for doctor Registration</i>
            </div>
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
            <BsFillPeopleFill size={150} />
            <hr />
          </div>
          <div className="dashboard-card-content">
            <div className="card-body text-center">
              {" "}
              <i>Click here for patient Registration.</i>
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
