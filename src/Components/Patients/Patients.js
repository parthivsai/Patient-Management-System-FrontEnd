import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import "./Patients.css";
import UpdatePatient from "./UpdatePatient";

const Patients = () => {
  const [pat, setPat] = useState([]);
  const [showUpdatePatient, setShowUpdatePatient] = useState(false);
  const [patientId, setPatientId] = useState();

  var { token, role } = useSelector((store) => store.userReducer);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(role);
    if (role.length < 1) {
      console.log(
        "Coming here while loading after refresh and role is: " + role
      );
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:2121/patient/getAll")
      .then((response) => response.json())
      .then((data) => {
        setPat(data);
      });
  }, [showUpdatePatient]);

  const handleDelete = async (item) => {
    try {
      var lst = pat.filter((ele) => ele.id != item.id);
      setPat(lst);
      await axios.delete(`http://localhost:2121/patient/delete/${item.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Succesfully Deleted the Patient", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to Delete Patient", {
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
        <div>
          <h1 className="text-center">Patients</h1>
        </div>
        <div className="portaldiv">
          {showUpdatePatient &&
            createPortal(
              <UpdatePatient
                patientId={patientId}
                onClose={() => setShowUpdatePatient(false)}
              />,
              document.getElementById("root")
            )}
        </div>
        <div className="tableFixHead">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pat &&
                pat.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>
                      <AiOutlineEdit
                        onClick={() => {
                          setPatientId(item.id);
                          setShowUpdatePatient(true);
                        }}
                        className="UpdateIcon mx-2"
                      />
                      <MdOutlineDelete
                        onClick={() => handleDelete(item)}
                        className="DeleteIcon mx-1"
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

export default Patients;
