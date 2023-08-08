import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import "./ApprovalRequest.css";
import axios from "axios";

const ApprovalRequest = () => {
  const { userDetails } = useSelector((store) => store.userReducer);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  var { role } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  if (role) {
    var docId = userDetails.id;
  }

  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2121/status/getByDoc/pending/${docId}`)
      .then((response) => response.json())
      .then((data) => setPendingApprovals(data));
  }, []);

  const handleAcceptClick = async (RecordId) => {
    try {
      await axios.put(
        `http://localhost:2121/status/updateStatus/${RecordId}`,
        "APPROVED",
        { headers: { "Content-Type": "text/plain" } }
      );

      var lst = pendingApprovals.filter((i) => i.id != RecordId);
      setPendingApprovals(lst);
      toast.success("Succesfully approved the Request!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to approve the Request", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const handleRejectClick = async (RecordId) => {
    try {
      await axios.put(
        `http://localhost:2121/status/updateStatus/${RecordId}`,
        "REJECTED",
        { headers: { "Content-Type": "text/plain" } }
      );
      toast.success("Succesfully Rejected the Request!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      var lst = pendingApprovals.filter((i) => i.id != RecordId);
      setPendingApprovals(lst);
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to Reject the Request", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <>
      <div className="Patient-Container">
        <h3 className="text-center">Pending Requests</h3>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Requested Slot</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.length === 0 && <h5>No Records Found</h5>}
              {pendingApprovals &&
                pendingApprovals.map((item) => (
                  <tr key={item.id}>
                    <td>{item.patient.name}</td>
                    <td>{item.request}</td>
                    <td>{item.day}</td>
                    <td>{item.timeSlot}</td>
                    <td>
                      <TiTick
                        onClick={() => {
                          handleAcceptClick(item.id);
                        }}
                        className="AcceptedIcon mx-2"
                      />
                      <RxCross2
                        onClick={() => handleRejectClick(item.id)}
                        className="RejectedIcon mx-1"
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

export default ApprovalRequest;
