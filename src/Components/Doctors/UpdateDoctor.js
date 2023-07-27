import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Axios } from "axios";
import { toast } from "react-hot-toast";

const UpdateDoctor = (props) => {
  const [doctor, setDoctor] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    fetch(`http://localhost:2121/doctor/get/${props.doctorId}`)
      .then((response) => response.json())
      .then((data) => setDoctor(data));
  }, []);
  useEffect(() => {
    setEmail(doctor.email);
    setName(doctor.name);
    setSpecialization(doctor.specialization);
  }, [doctor]);

  const handleSave = async () => {
    doctor.name = name;
    doctor.email = email;
    doctor.specialization = specialization;

    let newDoctor = {
      id: props.doctorId,
      name: name,
      email: email,
      specialization: specialization,
    };

    try {
      await axios.put(
        `http://localhost:2121/doctor/update/${props.doctorId}`,
        newDoctor
      );
      toast.success("Succesfully updated the Doctor Details!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to update Doctor Details", {
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
      <div className="overLay" />
      <div className="card cardedit">
        <div className="card-head">
          <h4 className="text-center">Update Doctor</h4>
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
                doctor.name = name;
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
                doctor.email = email;
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
                doctor.specialization = specialization;
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

export default UpdateDoctor;
