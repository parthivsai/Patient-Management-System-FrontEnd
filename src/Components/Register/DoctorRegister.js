import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./modal.css";

const DoctorRegister = (props) => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const role = "DOCTOR";

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
      handleAddDoctor(user);
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

  const handleAddDoctor = async (user) => {
    let newPatient = {
      id: props.patientId,
      name: name,
      specialization: specialization,
      email: email,
    };
    console.log("in adding doctor");
    if (user.id) {
      try {
        await axios.post(
          `http://localhost:2121/doctor/add/${user.id}`,
          newPatient
        );
        toast.success("Succesfully added Doctor!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (err) {
        console.log(err.response);
        toast.error("Failed to add Doctor", {
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
          <h4 className="text-center">Add Doctor</h4>
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
            <label>Specialization:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={specialization}
              onChange={(event) => {
                setSpecialization(event.target.value);
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

export default DoctorRegister;
