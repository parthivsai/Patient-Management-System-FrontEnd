import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import PrescribePatient from "./PrescribePatient";

const UpcomingAppointments = () => {
  const { userDetails } = useSelector((store) => store.userReducer);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [getDate, setGetDate] = useState("");

  var { role } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  if (role) {
    var docId = userDetails.id;
  }

  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2121/status/getByDoc/approved/${docId}`)
      .then((response) => response.json())
      .then((data) => setUpcomingAppointments(data));
  }, []);

  return (
    <>
      <div>
        <h3 className="text-center">Upcoming Appointments</h3>
        {showPrescriptionForm &&
          createPortal(
            <PrescribePatient
              date={getDate}
              doctorId={doctorId}
              patientId={patientId}
              onClose={() => setShowPrescriptionForm(false)}
            />,
            document.getElementById("root")
          )}
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Requested Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {console.log(upcomingAppointments)}
              {upcomingAppointments.length === 0 && <h5>No Records Found</h5>}
              {upcomingAppointments &&
                upcomingAppointments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.patient.name}</td>
                    <td>{item.request}</td>
                    <td>{item.day}</td>
                    <td>{item.timeSlot}</td>
                    <td>{item.approvalStatus}</td>
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          setPatientId(item.patient.id);
                          setDoctorId(userDetails.id);
                          setShowPrescriptionForm(true);
                          setGetDate(item.day);
                        }}
                      >
                        Prescribe
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

export default UpcomingAppointments;
