import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const PrescribePatient = (props) => {
  const [disease, setDisease] = useState("");
  const [prescription, setPrescription] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");

  useEffect(() => {
    fetch("http://localhost:2121/medicine/getAll")
      .then((response) => response.json())
      .then((data) => setMedicines(data));
  }, []);

  const handleSave = () => {
    // console.log(day, timeSlot);
    console.log(selectedMedicine);
    if (prescription === "" || selectedMedicine === "") {
      toast.error("Invalid Request! Fill in the Details", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      props.onClose();
      return;
    }
    let requestData = {
      disease: disease,
      date: props.date,
      prescription: prescription,
    };
    try {
      axios.post(
        `http://localhost:2121/visits/add/${props.patientId}/${props.doctorId}/${selectedMedicine}`,
        requestData
      );
      toast.success("Succesfully sent the Request!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to send the Request", {
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
          <h4 className="text-center">Give Prescription</h4>
          <button
            className="btn btn-danger closeButton"
            onClick={props.onClose}
          >
            x
          </button>
        </div>
        <div className="card-body">
          <div>
            <label>Disease:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={disease}
              onChange={(event) => {
                setDisease(event.target.value);
              }}
            />
          </div>
          <div className="select">
            <select
              className="select"
              onClick={(event) => setSelectedMedicine(event.target.value)}
            >
              {console.log(medicines)}
              <option value="">Select a Medicine</option>
              {medicines.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Dosage:</label>
            <input
              type="text"
              name=""
              placeholder=""
              value={prescription}
              onChange={(event) => {
                setPrescription(event.target.value);
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

export default PrescribePatient;
