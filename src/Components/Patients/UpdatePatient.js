import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./UpdatePatient.css";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdatePatient = (props) => {
  const { token, role } = useSelector((store) => store.userReducer);
  const [patient, setPatient] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (role.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2121/patient/get/${props.patientId}`)
      .then((response) => response.json())
      .then((data) => setPatient(data));
  }, []);
  useEffect(() => {
    setAge(patient.age);
    setName(patient.name);
    setAddress(patient.address);
    setEmail(patient.email);
  }, [patient]);

  const handleSave = async () => {
    console.log(patient);
    let newPatient = {
      id: props.patientId,
      name: name,
      age: age,
      address: address,
      email: email,
    };
    try {
      await axios.put(
        `http://localhost:2121/patient/update/${props.patientId}`,
        newPatient,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Succesfully updated the Patient Details!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to update Patient Details", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    props.onClose();
  };

  return (
    <>
      {console.log(props.patientId)}
      {console.log(name)}
      <div className="overLay" />
      <div className="card cardedit">
        <div className="card-head">
          <h4 className="text-center">Update Patient</h4>
          <button
            className="btn btn-danger closeButton"
            onClick={props.onClose}
          >
            x
          </button>
        </div>
        <div className="card-body">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                patient.name = name;
              }}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
                patient.age = age;
              }}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
                patient.address = address;
              }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                patient.email = email;
              }}
            />
          </div>
          <hr />
          <div className="BottomSection">
            <button className="btn btn-dark saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePatient;
