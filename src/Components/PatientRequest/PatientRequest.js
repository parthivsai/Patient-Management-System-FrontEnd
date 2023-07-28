import React, { useEffect, useState } from "react";
import AppointmentRequest from "../AppointmentRequest/AppointmentRequest";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { FcApproval } from "react-icons/fc";

const PatientRequest = () => {
  const { userDetails } = useSelector((store) => store.userReducer);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [showRequestAppointment, setShowRequestAppointment] = useState(false);

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2121/doctor/getAll")
      .then((response) => response.json())
      .then((data) => setDocs(data));
  }, []);

  return (
    <>
      {console.log(userDetails)}
      <div className="Patient-Container">
        <div>
          <h1 className="text-center">Doctors Available</h1>
          {/* <label className="searchLabel">Search</label>
        <input
          className="form-control searchFilter"
          type="text"
          placeholder="Search.."
          onChange={handleFilterChange}
        /> */}
        </div>
        <div className="portaldiv">
          {showRequestAppointment &&
            createPortal(
              <AppointmentRequest
                doctorId={doctorId}
                patientId={patientId}
                onClose={() => setShowRequestAppointment(false)}
              />,
              document.getElementById("root")
            )}
        </div>
        <div className="tableFixHead">
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs &&
                docs.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.specialization}</td>
                    <td>
                      <FcApproval
                        onClick={() => {
                          setPatientId(userDetails.id);
                          setDoctorId(item.id);
                          setShowRequestAppointment(true);
                        }}
                        className="UpdateIcon mx-2"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientRequest;
