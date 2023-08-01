import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./modal.css";

const PatientRegister = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const role = "PATIENT";

  const navigate = useNavigate();

  const handleAddUser = async () => {
    let newUser = {
      username: username,
      password: password,
      role: role,
    };
    console.log("in adding user");
    try {
      const response = await axios.post(
        `http://localhost:2121/user/add`,
        newUser
      );
      const user = response.data;
      handleAddPatient(user);
      // toast.success("Succesfully Added User!", {
      //   style: {
      //     borderRadius: "10px",
      //     background: "#333",
      //     color: "#fff",
      //   },
      // });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to Add user", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const handleAddPatient = async (user) => {
    let newPatient = {
      id: props.patientId,
      name: name,
      age: age,
      address: address,
      email: email,
    };
    console.log("in adding patient");
    if (user.id) {
      try {
        await axios.post(
          `http://localhost:2121/patient/add/${user.id}`,
          newPatient
        );
        toast.success("Succesfully added the Patient!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (err) {
        console.log(err.response);
        toast.error("Failed to add Patient", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
    props.onClose();
    navigate("/login");
  };

  const handleSave = async () => {
    handleAddUser();
  };

  return (
    <>
      <div className="overLay" />
      <div className="card cardedit">
        <div className="card-head">
          <h4 className="text-center">Add Patient</h4>
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
              }}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name=""
              placeholder=""
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
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

export default PatientRegister;
