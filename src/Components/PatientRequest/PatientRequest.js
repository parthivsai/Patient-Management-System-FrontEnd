import React, { useEffect, useState } from "react";
import AppointmentRequest from "../AppointmentRequest/AppointmentRequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";

const PatientRequest = () => {
  const { userDetails } = useSelector((store) => store.userReducer);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [showRequestAppointment, setShowRequestAppointment] = useState(false);

  const [docs, setDocs] = useState([]);

  var { role } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

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
          <h1 className="text-center">Request Appointment</h1>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs &&
                docs.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.specialization}</td>
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          setPatientId(userDetails.id);
                          setDoctorId(item.id);
                          setShowRequestAppointment(true);
                        }}
                      >
                        Request
                      </button>
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
