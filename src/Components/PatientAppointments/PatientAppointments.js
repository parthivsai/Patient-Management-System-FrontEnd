import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./PatientAppointments.css";
import { useNavigate } from "react-router-dom";
const PatientAppointments = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  const { userDetails, role } = useSelector((store) => store.userReducer);

  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2121/status/getByPat/pending/${userDetails.id}`)
      .then((response) => response.json())
      .then((data) => setPendingRequests(data));

    fetch(`http://localhost:2121/status/getByPat/approved/${userDetails.id}`)
      .then((response) => response.json())
      .then((data) => setApprovedRequests(data));

    fetch(`http://localhost:2121/status/getByPat/rejected/${userDetails.id}`)
      .then((response) => response.json())
      .then((data) => setRejectedRequests(data));
  }, []);

  return (
    <>
      <div className="Patient-Container">
        <h3 className="text-center">Pending Requests</h3>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Requested Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="scrollable">
              {pendingRequests.length === 0 && <h5>No Records Found</h5>}
              {pendingRequests &&
                pendingRequests.map((item) => (
                  <tr key={item.id}>
                    <td>{item.doctor.name}</td>
                    <td>{item.request}</td>
                    <td>{item.day}</td>
                    <td>{item.timeSlot}</td>
                    <td>{item.approvalStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-center">Approved Requests</h3>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Requested Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="scrollable">
              {approvedRequests.length === 0 && <h5>No Records Found</h5>}
              {approvedRequests &&
                approvedRequests.map((item) => (
                  <tr key={item.id}>
                    <td>{item.doctor.name}</td>
                    <td>{item.request}</td>
                    <td>{item.day}</td>
                    <td>{item.timeSlot}</td>
                    <td>{item.approvalStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-center">Rejected Requests</h3>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Requested Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rejectedRequests.length === 0 && <h5>No Records Found</h5>}
              {rejectedRequests &&
                rejectedRequests.map((item) => (
                  <tr key={item.id}>
                    <td>{item.doctor.name}</td>
                    <td>{item.request}</td>
                    <td>{item.day}</td>
                    <td>{item.timeSlot}</td>
                    <td>{item.approvalStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientAppointments;
